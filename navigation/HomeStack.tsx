import React from 'react';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackNavigatorParamList } from './types';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import DevScreen from '../screens/DevScreen/DevScreen';
import FirstScreenLogo from '../screens/FirstScreenLogo/FirstScreenLogo';
import FirstPresentationScreen from '../screens/FirstPresentationScreen/FirstPresentationScreen';
import SecondPresentationScreen from '../screens/SecondPresentationScreen/SecondPresentationScreen';
import SignupScreen from '../screens/SignupScreen/SignupScreen';
import SigninScreen from '../screens/SigninScreen/SigninScreen';
import BookmarksScreen from '../screens/BookmarksScreen/BookmarksScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen/VerifyCodeScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ParamCompteScreen from '../screens/ParamCompteScreen/ParamCompteScreen';
import ListingScreen from '../screens/ListingScreen/ListingScreen';
import BottomTabs from './Tabs';
import LinkingConfiguration from './LinkingConfiguration';
import { ClerkLoaded, useUser } from '@clerk/clerk-expo';
import ParamScreen from '../screens/ParamScreen/ParamScreen';
import UserProfileScreen from '../screens/UserProfileScreen/UserProfileScreen';

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
  const { isSignedIn } = useUser();
  console.log('isSignedIn', isSignedIn);

  return (
    <SafeAreaProvider>
      <StatusBar style='dark' backgroundColor='white' />
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isSignedIn ? (
          <>
            {/* <HomeStack.Screen
              name='DevScreen'
              component={DevScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            /> */}
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
              name='SignupScreen'
              component={SignupScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <HomeStack.Screen
              name='VerifyCode'
              component={VerifyCodeScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <HomeStack.Screen
              name='SigninScreen'
              component={SigninScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <HomeStack.Screen
              name='Listing'
              component={ListingScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <HomeStack.Screen
              name='UserProfile'
              component={UserProfileScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <HomeStack.Screen
              name='Bookmarks'
              component={BookmarksScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
          </>
        ) : (
          <>
            <HomeStack.Screen name='BottomTabs' component={BottomTabs} />
            <HomeStack.Screen
              name='Listing'
              component={ListingScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <HomeStack.Screen
              name='UserProfile'
              component={UserProfileScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <HomeStack.Screen
              name='Bookmarks'
              component={BookmarksScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
          </>
        )}
      </HomeStack.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeStackNavigator;
