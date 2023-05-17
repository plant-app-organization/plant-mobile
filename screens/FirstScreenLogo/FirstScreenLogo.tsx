import React, { useState, useRef, useEffect } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface FirstScreenLogoProps {}

const FirstScreenLogo: React.FunctionComponent<FirstScreenLogoProps> = (props) => {
  return (
    <LinearGradient
      colors={['#cfe9f1', '#eafdf4', '#FEFFFF']}
      className='w-screen h-screen flex items-center justify-center'
    >
      <View className='h-200 flex items-center justify-center '>
        <Text
          style={{
            width: '100%',
            height: '27%',

            fontSize: 56,
          }}
          className='font-Gentle text-rose-500 text-6xl'
        >
          <Text className='text-rose-900 font-Gentle'>Wi</Text>
          low
        </Text>

        <Text className='text-black text-3xl -mt-4 font-LANENAR text-xl'>second life</Text>
      </View>
    </LinearGradient>
  )
}

export default FirstScreenLogo
