import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, LogBox } from 'react-native'
import { NativeBaseProvider, Spinner } from 'native-base'
import React, { useState } from 'react'
import { ClerkProvider } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

// import { API_URL } from '@env';
import RootNavigator from './navigation'
import { useFonts } from 'expo-font'
LogBox.ignoreAllLogs()

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from '@apollo/client'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { offsetLimitPagination } from '@apollo/client/utilities'

const tokenCache = {
  getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return null
    }
  },
}
export default function App() {
  //
  const [userToken, setUserToken] = useState<string | null>(null)

  const retrieveToken = async () => {
    const token = await SecureStore.getItemAsync('__clerk_client_jwt')
    console.log('🔐userToken in SecureStore', token)
    setUserToken(token)
  }
  retrieveToken()
  console.log('🪴 API_URL', process.env.API_URL)
  //
  // const token = await getToken();

  const wsLink = new WebSocketLink({
    uri: process.env.WS_URL,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: userToken,
      },
    },
  })
  const httpLink = createHttpLink({
    uri: process.env.API_URL,
  })

  // Initialize Apollo Client.
  const authLink = setContext((_, { headers }) => {
    const retrieveToken = async () => {
      const token = await SecureStore.getItemAsync('__clerk_client_jwt')
      // console.log('🔐userToken in SecureStore', token);
      setUserToken(token)
    }
    retrieveToken()
    return {
      headers: {
        ...headers,
        authorization: userToken ? `Bearer ${userToken}` : '',
      },
    }
  })
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    authLink.concat(httpLink),
  )
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            OffersListSearch: {
              keyArgs: ['searchInput', 'filters', 'environment'], // fields that uniquely identify the data
              merge(existing = [], incoming) {
                return [...existing, ...incoming]
              },
            },
          },
        },
      },
    }),
  })

  const [fontsLoaded] = useFonts({
    LANENAR: require('./assets/fonts/LANENAR.ttf'),
    Gentle: require('./assets/fonts/Gentle.otf'),
    Roboto: require('./assets/fonts/Roboto.ttf'),
    antipasto: require('./assets/fonts/antipasto.ttf'),
    helvetica: require('./assets/fonts/helvetica.ttf'),
    manrope_regular: require('./assets/fonts/manrope.regular.otf'),
    manrope_bold: require('./assets/fonts/manrope.bold.otf'),
    manrope_extra_bold: require('./assets/fonts/manrope.extrabold.otf'),
    manrope_semi_bold: require('./assets/fonts/manrope.semibold.otf'),
  })

  return (
    <ApolloProvider client={client}>
      <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <NativeBaseProvider>
          <RootNavigator />
          <StatusBar style='auto' />
        </NativeBaseProvider>
      </ClerkProvider>
    </ApolloProvider>
  )
}
