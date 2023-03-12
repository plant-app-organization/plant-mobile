import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigator from './HomeStack';

import * as NavigationBar from 'expo-navigation-bar';
import { useAuth, useSession } from '@clerk/clerk-expo';

const RootNavigator = () => {
  // const { getToken } = useAuth();

  // const retrieveToken = async () => {
  //   const userToken = await getToken();
  //   console.log('userTOkrn', userToken);
  // };
  // retrieveToken();
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
