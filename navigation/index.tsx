import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeStackNavigator from './HomeStack'

import * as NavigationBar from 'expo-navigation-bar'
import { useAuth, useSession } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

const prefix = Linking.createURL('/')

const RootNavigator = () => {
  // const { getToken } = useAuth();
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        ChatScreen: 'inbox/',
      },
    },
  }
  // const retrieveToken = async () => {
  //   const userToken = await getToken();
  //   console.log('userTOkrn', userToken);
  // };
  // retrieveToken();
  return (
    <NavigationContainer linking={linking}>
      <HomeStackNavigator />
    </NavigationContainer>
  )
}

export default RootNavigator
