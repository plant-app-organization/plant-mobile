import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigator from './HomeStack';

import * as NavigationBar from 'expo-navigation-bar';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
