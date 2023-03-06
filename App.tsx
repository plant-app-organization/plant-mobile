import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NativeBaseProvider, Spinner } from 'native-base';
import React from 'react';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

// import { API_URL } from '@env';
import RootNavigator from './navigation';
import { useFonts } from 'expo-font';
LogBox.ignoreAllLogs();

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from '@apollo/client';

const tokenCache = {
  getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return null;
    }
  },
};
export default function App() {
  // commetn
  //cx
  console.log(process.env.API_URL);

  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: 'localhost:4000/graphql',
    cache: new InMemoryCache(),
  });

  const [fontsLoaded] = useFonts({
    LANENAR: require('./assets/fonts/LANENAR.ttf'),
    Gentle: require('./assets/fonts/Gentle.otf'),
    Roboto: require('./assets/fonts/Roboto.ttf'),
    antipasto: require('./assets/fonts/antipasto.ttf'),
    helvetica: require('./assets/fonts/helvetica.ttf'),
  });

  return (
    <ApolloProvider client={client}>
      <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <NativeBaseProvider>
          <RootNavigator />
          <StatusBar style='auto' />
        </NativeBaseProvider>
      </ClerkProvider>
    </ApolloProvider>
  );
}
