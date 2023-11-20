import React from 'react'
import { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackNavigatorParamList } from './types'
import * as Notifications from 'expo-notifications'
import { useOnMessageAddedSubscription } from '../graphql/graphql'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import DevScreen from '../screens/DevScreen/DevScreen'
import FirstScreenLogo from '../screens/FirstScreenLogo/FirstScreenLogo'
import FirstPresentationScreen from '../screens/FirstPresentationScreen/FirstPresentationScreen'
import SecondPresentationScreen from '../screens/SecondPresentationScreen/SecondPresentationScreen'
import SignupScreen from '../screens/SignupScreen/SignupScreen'
import SigninScreen from '../screens/SigninScreen/SigninScreen'
import BookmarksScreen from '../screens/BookmarksScreen/BookmarksScreen'
import PlantCareScreen from '../screens/PlantCareScreen/PlantCareScreen'
import PlantDiseaseScreen from '../screens/PlantDiseaseScreen/PlantDiseaseScreen'

import VerifyCodeScreen from '../screens/VerifyCodeScreen/VerifyCodeScreen'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import ParamCompteScreen from '../screens/ParamCompteScreen/ParamCompteScreen'
import ListingScreen from '../screens/ListingScreen/ListingScreen'
import BottomTabs from './Tabs'
import LinkingConfiguration from './LinkingConfiguration'
import { ClerkLoaded, useUser } from '@clerk/clerk-expo'
import ParamScreen from '../screens/ParamScreen/ParamScreen'
import UserProfileScreen from '../screens/UserProfileScreen/UserProfileScreen'
import PlantIdentityScreen from '../screens/PlantIdentityScreen/PlantIdentityScreen'
import PlantIdentityInfoScreen from '../screens/PlantIdentityInfoScreen/PlantIdentityInfoScreen'
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen'
import { TransitionSpecs } from '@react-navigation/stack'
import CameraScreen from '../screens/CameraScreen/CameraScreen'
import GalleryScreen from '../screens/GalleryScreen/GalleryScreen'
import ChatScreen from '../screens/ChatScreen/ChatScreen'

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>()
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
}

const HomeStackNavigator = () => {
  // subscription to messages
  useOnMessageAddedSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      const newMessage = subscriptionData.data?.messageAdded
      if (newMessage) {
        console.log('XXXX', newMessage)
        showNotification(newMessage)
      }
    },
  })

  // function to show notification
  const showNotification = (message) => {
    console.log('notif!!!!!!!')
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'New Message!',
        body: message.text,
        // data can be used to handle notification tap
        data: { message },
      },
      trigger: null,
    })
  }

  useEffect(() => {
    Notifications.requestPermissionsAsync()

    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification)
    })

    return () => subscription.remove()
  }, [])
  const { isSignedIn } = useUser()
  console.log('isSignedIn', isSignedIn)

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
            {/* <HomeStack.Screen
              name='FirstScreenLogo'
              component={FirstScreenLogo}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            /> */}
            <HomeStack.Screen name='BottomTabs' component={BottomTabs} />

            <HomeStack.Screen
              name='FirstPresentationScreen'
              component={FirstPresentationScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />

            <HomeStack.Screen
              name='ChatScreen'
              component={ChatScreen}
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
              name='Bookmarks'
              component={BookmarksScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <HomeStack.Screen
              name='PlantCareScreen'
              component={PlantCareScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <HomeStack.Screen
              name='PlantDiseaseScreen'
              component={PlantDiseaseScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <HomeStack.Screen
              name='PlantIdentityScreen'
              component={PlantIdentityScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />

            <HomeStack.Screen
              name='PlantIdentityInfoScreen'
              component={PlantIdentityInfoScreen}
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
                animationDuration: 10,
              }}
            />
            <HomeStack.Screen
              name='SecondPresentationScreen'
              component={SecondPresentationScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
                animationDuration: 10,
              }}
            />
            <HomeStack.Screen
              name='Gallery'
              component={GalleryScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
                animationDuration: 10,
              }}
            />

            <HomeStack.Screen
              name='UserProfile'
              component={UserProfileScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
                animationDuration: 10,
              }}
            />
            <HomeStack.Screen
              name='Bookmarks'
              component={BookmarksScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
                animationDuration: 10,
              }}
            />
            <HomeStack.Screen
              name='PlantCareScreen'
              component={PlantCareScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
                animationDuration: 10,
              }}
            />
            <HomeStack.Screen
              name='PlantDiseaseScreen'
              component={PlantDiseaseScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
                animationDuration: 10,
              }}
            />
            <HomeStack.Screen
              name='PlantIdentityScreen'
              component={PlantIdentityScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
                animationDuration: 10,
              }}
            />
            <HomeStack.Screen
              name='ChatScreen'
              component={ChatScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <HomeStack.Screen
              name='CameraScreen'
              component={CameraScreen}
              options={{
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_bottom',
              }}
            />
            <HomeStack.Screen
              name='PlantIdentityInfoScreen'
              component={PlantIdentityInfoScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
                animationDuration: 10,
              }}
            />
            <HomeStack.Screen
              name='EditProfileScreen'
              component={EditProfileScreen}
              options={{
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
                animationDuration: 10,
              }}
            />
          </>
        )}
      </HomeStack.Navigator>
    </SafeAreaProvider>
  )
}

export default HomeStackNavigator
