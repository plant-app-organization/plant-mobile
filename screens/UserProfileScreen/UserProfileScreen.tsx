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
import UserOffersDisplay from '../../components/UserOffersDisplay/UserOffersDisplay'

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

  console.log('🔥props.route.params dans UserProfileScreen', props.route.params)
  const navigation = useNavigation()

  const { offerIds, avatar, createdAt, id, isPro, updatedAt, userBio, userName, city } =
    props.route.params.userData
  return (
    <LinearGradient colors={['#C3EEEF', 'white', 'white']} className='h-screen w-screen flex-1'>
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        className='h-screen w-screen flex-1 justify-between '
      >
        <View className='w-full h-full px-0 flex justify-between '>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-[40px] h-[40px] justify-center items-center rounded-full border border-gray-200 bg-white opacity-50 absolute top-5 left-5 z-10 shadow'
          >
            <ChevronLeftIcon color={'black'} />
          </TouchableOpacity>
          <View className='flex items-center justify-center mb-10  '>
            <Image
              source={{
                uri: avatar,
              }}
              className='w-24 h-24 rounded-full'
            />
            <Text className='text-2xl font-bold mt-2'>{userName}</Text>
            {/* {city && <Text className='text-gray-500'>{user.city}</Text>} */}
          </View>
          <View className='border-b border-gray-200 pb-4 mb-4'>
            <Text className='text-xl font-bold'>à propos de moi:</Text>
            <Text className='text-gray-600 mt-2'>{userBio}</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className='text-xl font-bold mb-5'>Ma Note:</Text>
            <View className='mb-4 items-center justify-center'>
              <Text className='text-xl'>{personalPlants}</Text>
              <Text className='text-yellow-500 text-3xl mt-2'>5/5</Text>
            </View>

            <View className='mb-4'>
              <Text className='text-xl font-bold'>les ventes en cours:</Text>
              {/* {offerIds.map((listing, index) => (
                <View key={index} className='border border-gray-200 rounded-md p-4 mt-2'>
                  <Text className='text-lg font-bold'>{listing}</Text>
                  <Text className='text-gray-600 mt-1'>{listing}</Text>
                </View>
              ))} */}
              <UserOffersDisplay offerIds={offerIds} />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default UserProfileScreen
