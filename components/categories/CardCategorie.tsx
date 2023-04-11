import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { Spinner } from 'native-base'

import { Image } from 'expo-image'

import { ChevronRightIcon } from 'react-native-heroicons/solid'
import { LinearGradient } from 'expo-linear-gradient'

interface CardCategorieProps {
  name: string
  image: string
}

const CardCategorie: React.FunctionComponent<CardCategorieProps> = (props) => {
  let firstColor
  let secondColor

  if (props.name === 'Tropicales') {
    firstColor = '#FFFFE8'
    secondColor = '#FFFFF2'
  } else if (props.name === 'Rares') {
    firstColor = '#FFEFFC'
    secondColor = '#FFF9FE'
  } else if (props.name === 'du Potager') {
    firstColor = '#FDF5E9'
    secondColor = '#FFF8F0'
  } else if (props.name === 'Aromatiques') {
    firstColor = '#E7FFEC'
    secondColor = '#F3FFF6'
  } else if (props.name === 'Cactus') {
    firstColor = '#E4F5FF'
    secondColor = '#F5FBFF'
  }

  return (
    <LinearGradient
      start={{ x: 0.5, y: 0.8 }}
      end={{ x: 0.8, y: 0 }}
      colors={[`${firstColor}`, `${secondColor}`]}
      className='w-[100%] h-[120px] rounded-lg mb-3'
    >
      <TouchableOpacity className='w-full h-full flex flex-row'>
        <View className='w-6/12 h-full flex-row items-center'>
          <Text className='font-semibold text-slate-800	font-bold	text-lg ml-4'>
            Plantes {'\n'}
            {props.name}
          </Text>
        </View>

        <Image
          source={props.image}
          className='w-6/12 h-full rounded-lg relative z-20'
          contentFit='cover'
        />
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default CardCategorie
