import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'expo-image'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient'

import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid'

interface UserProfileScreenProps {}

const UserProfileScreen: React.FunctionComponent<UserProfileScreenProps> = (props) => {
  const personalPlants: JSX.Element[] = []
  for (let i = 0; i < 5; i++) {
    let style = { color: 'black' }
    if (i < 3) {
      style = { color: 'orange' }
    }
    personalPlants.push(<FontAwesomeIcon name='star' size='20%' style={style} />)
  }
  const user = {
    pseudo: 'lulu',
    city: 'Marseille',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget diam nec ex pharetra aliquam.',
    rating: 4.7,
    listings: [
      {
        title: 'Monstera',
        price: '100 euros',
      },
      {
        title: 'pilea',
        price: '30 euros',
      },
    ],
  }
  console.log('🔥props.route.params dans UserProfileScreen', props.route.params)
  const navigation = useNavigation()
  return (
    <LinearGradient colors={['#C3EEEF', 'white', 'white']} className='h-screen w-screen flex-1'>
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        className='h-screen w-screen flex-1 justify-between '
      >
        <View className='w-full h-full px-5 flex justify-between '>
          <View className='flex items-center justify-center mb-10  '>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
              className='w-24 h-24 rounded-full'
            />
            <Text className='text-2xl font-bold mt-2'>{user.pseudo}</Text>
            <Text className='text-gray-500'>{user.city}</Text>
          </View>

          <View className='border-b border-gray-200 pb-4 mb-4'>
            <Text className='text-xl font-bold'>à propos de moi:</Text>
            <Text className='text-gray-600 mt-2'>{user.description}</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className='text-xl font-bold mb-5'>Ma Note:</Text>
            <View className='mb-4 items-center justify-center'>
              <Text className='text-xl'>{personalPlants}</Text>
              <Text className='text-yellow-500 text-3xl mt-2'>{user.rating}</Text>
            </View>

            <View className='mb-4'>
              <Text className='text-xl font-bold'>les ventes en cours:</Text>
              {user.listings.map((listing, index) => (
                <View key={index} className='border border-gray-200 rounded-md p-4 mt-2'>
                  <Text className='text-lg font-bold'>{listing.title}</Text>
                  <Text className='text-gray-600 mt-1'>{listing.price}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default UserProfileScreen
