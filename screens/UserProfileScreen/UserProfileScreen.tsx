import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'expo-image'

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient'

import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid'

interface UserProfileScreenProps {}

const UserProfileScreen: React.FunctionComponent<UserProfileScreenProps> = (props) => {
  console.log('🔥props.route.params dans UserProfileScreen', props.route.params)
  const navigation = useNavigation()
  return (
    <LinearGradient
      colors={[
        '#f2fff3',
        '#e2f7f6',
        '#f0fafb',
        '#fdf5fb',
        '#f2fff3',
        '#e2f7f6',
        '#f0fafb',
        '#fdf5fb',
      ]}
      className='h-screen w-screen flex-1'
    >
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        className='h-screen w-screen flex-1 justify-between'
      >
        <View className='flex items-center justify-center mt-8 mb-4'>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
            className='w-24 h-24 rounded-full'
          />
          <Text className='text-2xl font-bold mt-2'>John Doe</Text>
          <Text className='text-gray-500'>New York, USA</Text>
        </View>

        <View className='border-b border-gray-200 pb-4 mb-4'>
          <Text className='text-xl font-bold'>About Me</Text>
          <Text className='text-gray-600 mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget diam nec ex
            pharetra aliquam.
          </Text>
        </View>

        <View>
          <Text className='text-xl font-bold'>My Listings</Text>
          {/* Render the user's listings */}
          {/* For each listing, you can create a separate component */}
          {/* with the necessary details */}
          {/* Example: */}
          {/* <ListingCard title="Cozy Apartment" price="$100/night" /> */}
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default UserProfileScreen
