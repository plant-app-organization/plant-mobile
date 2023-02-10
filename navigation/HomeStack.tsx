import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackNavigatorParamList } from './types';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import DevScreen from '../screens/DevScreen/DevScreen';
import FirstScreenLogo from '../screens/FirstScreenLogo/FirstScreenLogo';
import FirstPresentationScreen from '../screens/FirstPresentationScreen/FirstPresentationScreen';
import SecondPresentationScreen from '../screens/SecondPresentationScreen/SecondPresentationScreen';
import ThirdPresentationScreen from '../screens/ThirdPresentationScreen/ThirdPresentationScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BottomTabs from './Tabs';

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
          name='DevScreen'
          component={DevScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen name='BottomTabs' component={BottomTabs} />
        <HomeStack.Screen
          name='FirstScreenLogo'
          component={FirstScreenLogo}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen
          name='FirstPresentationScreen'
          component={FirstPresentationScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen
          name='SecondPresentationScreen'
          component={SecondPresentationScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen
          name='ThirdPresentationScreen'
          component={ThirdPresentationScreen}
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
