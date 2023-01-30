import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackNavigatorParamList } from './types';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import OnboardingScreen from '@screens/OnboardingScreen/OnboardingScreen';

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const HomeStackNavigator = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style='dark' backgroundColor='white' />
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <HomeStack.Screen
          name='Onboarding'
          component={OnboardingScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
      </HomeStack.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeStackNavigator;
