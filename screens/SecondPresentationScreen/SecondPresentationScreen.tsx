import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'expo-image'

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Button } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

interface SecondPresentationScreenProps {}

const SecondPresentationScreen: React.FunctionComponent<SecondPresentationScreenProps> = (
  props,
) => {
  const navigation = useNavigation()

  return (
    <LinearGradient colors={['#cfe9f1', '#eafdf4', '#FEFFFF']} className='h-screen w-screen'>
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      >
        <View className='w-screen h-screen items-center justify-evenly px-10 '>
          <View className='mb-8 w-full flex justify-center items-center'>
            <Text style={{ color: 'black' }} className='font-Gentle text-4xl font-bold'>
              Plante.
            </Text>
            <Text className='font-Roboto  text-black text-lg font-bold'>
              Découvrez, achetez, vendez
            </Text>
          </View>
          <Image
            style={{
              width: '100%',
              height: '35%',
              marginTop: 10,
            }}
            source={require('../../assets/logo2.png')}
          />
          <View className='w-full'>
            <Text className='font-Roboto   text-black text-xl font-bold mt-8 leading-8 text-center'>
              faites un geste pour la{' '}
              <Text className='font-Roboto   text-[#ccedcf] font-bold'>planète</Text>: achetez une
              plante <Text className='font-Roboto  text-[#ccedcf] font-bold'>local</Text> et luttez
              contre le <Text className='font-Roboto  text-[#ccedcf] font-bold'>gaspillage</Text>
            </Text>
            <View className='flex justify-center items-center mt-10 mb-10'>
              <View className='h-[45px] w-[150px] border-solid rounded-2xl flex items-center justify-center border-2'>
                <TouchableOpacity
                  className='h-40 w-180 rounded-25 bg-ccedcf flex items-center justify-center shadow-lg hover:shadow-xl'
                  onPress={() => navigation.navigate('HomeScreen')}
                >
                  <Text className='font-Roboto  text-black text-s font-bold'>Suivant</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SecondPresentationScreen
