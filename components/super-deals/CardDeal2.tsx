import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { Spinner } from 'native-base'
import { ChevronRightIcon } from 'react-native-heroicons/solid'

import { Image } from 'expo-image'

interface CardDeal2Props {
  Name: string

  photo: string
}

const CardDeal2: React.FunctionComponent<CardDeal2Props> = (props) => {
  return (
    <View className='bg-translate'>
      <TouchableOpacity className='h-32 w-52 bg-blue-600 rounded-lg relative mr-5'>
        <Image
          source={{ uri: props.photo }}
          className='w-full h-full rounded-lg opacity-70'
          contentFit='cover'
        />
        <View className='flex flex-col h-full w-8/12 items-center justify-center absolute left-0 z-10'>
          <Text className='pl-2 font-semibold text-white font-bold text-2xl'>{props.Name}</Text>
        </View>
        <View className='w-4/12 h-full flex justify-center items-center absolute right-0 z-10'>
          <ChevronRightIcon color={'white'} className='h-6 w-6' />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CardDeal2
