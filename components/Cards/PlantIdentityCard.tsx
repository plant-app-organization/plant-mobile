import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'

interface PlantIdentityCardProps {
  name: string
  image: string
  origin: string
  temperature: string
  petFriendly: string
  flowering: string
  dimension: string
  family: string
  exposition: string
  watering: string
}

const PlantIdentityCard: React.FunctionComponent<PlantIdentityCardProps> = (item) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PlantIdentityInfoScreen', {
          name: item.name,
          image: item.image,
          origin: item.origin,
          temperature: item.temperature,
          petFriendly: item.petFriendly,
          flowering: item.flowering,
          dimension: item.dimension,
          family: item.family,
          exposition: item.exposition,
          watering: item.watering,
        })
      }
      className='w-[160px] mb-10 mx-auto relative'
    >
      <Image
        source={item.image}
        contentFit='cover'
        className='w-full h-[190px] border border-gray-200 rounded-xl'
      />
      <Text className='font-bold text-center mt-3'>{item.name}</Text>
    </TouchableOpacity>
  )
}

export default PlantIdentityCard
