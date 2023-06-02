import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { Spinner } from 'native-base'

import { Image } from 'expo-image'

import { ChevronRightIcon } from 'react-native-heroicons/solid'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

interface CardCategorieProps {
  name: string
  image: string
}

const CardCategorie: React.FunctionComponent<CardCategorieProps> = (props) => {
  let firstColor
  let secondColor
  let filterName
  let fontColor
  const navigation = useNavigation()
  if (props.name === 'Tropicales') {
    firstColor = '#FFFFE8'
    secondColor = '#FFFFF2'
    filterName = 'tropical'
    fontColor = '#dddd42'
  } else if (props.name === 'Rares') {
    firstColor = '#FFEFFC'
    secondColor = '#FFF9FE'
    filterName = 'rare'
    fontColor = '#ce6bba'
  } else if (props.name === 'du Potager') {
    firstColor = '#FDE9E9'
    secondColor = '#FFF0F0'
    filterName = 'kitchenGarden'
    fontColor = '#b55353'
  } else if (props.name === 'Aromatiques') {
    firstColor = '#E7FFEC'
    secondColor = '#F3FFF6'
    filterName = 'aromatic'
    fontColor = '#57bf6c'
  } else if (props.name === 'Cactus') {
    firstColor = '#E4F5FF'
    secondColor = '#F5FBFF'
    filterName = 'succulent'
    fontColor = '#2c98d6'
  } else if (props.name === 'Intérieur') {
    firstColor = '#E4F5FF'
    secondColor = '#F5FBFF'
    filterName = 'interior'
    fontColor = '#2c98d6'
  }

  return (
    <LinearGradient
      start={{ x: 0.5, y: 0.8 }}
      end={{ x: 0.8, y: 0 }}
      colors={[`${firstColor}`, `${secondColor}`]}
      className='w-[100%] h-[120px] rounded-lg mb-3'
    >
      <TouchableOpacity
        className='w-full h-full flex flex-row'
        onPress={() =>
          navigation.navigate('Search', {
            filter: filterName,
          })
        }
      >
        <View className='w-6/12 h-full flex-row items-center'>
          <Text
            className='text-black	text-lg ml-4 tracking-wide '
            style={{ fontFamily: 'manrope_bold', color: '#323232' }}
          >
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
