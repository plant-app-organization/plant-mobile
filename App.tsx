import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Spinner } from 'native-base';
import React from 'react';
// import { API_URL } from '@env';
import RootNavigator from './navigation';
import { useFonts } from 'expo-font';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from '@apollo/client';

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
    Recoleta: require('./assets/fonts/Recoleta.otf'),
  });

  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <RootNavigator />
        <StatusBar style='auto' />
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
