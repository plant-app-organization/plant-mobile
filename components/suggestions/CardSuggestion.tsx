import React, { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native'

interface CardSuggestionProps {
  search: string
}

const CardSuggestion: React.FunctionComponent<CardSuggestionProps> = (props) => {
  const navigation = useNavigation()

  const backgroundColorStyles = [
    'bg-orange-100',
    'bg-blue-100',
    'bg-yellow-100',
    'bg-purple-100',
    'bg-green-100',
  ]

  const backgroundColorStyle =
    backgroundColorStyles[Math.floor(Math.random() * backgroundColorStyles.length)]

  return (
    <TouchableOpacity
      className={`w-[150px] rounded-2xl bg-orange-100 ${backgroundColorStyle} items-center py-5 mr-5 shadow-sm`}
      onPress={() => navigation.navigate('Search', { searchInput: props.search })}
    >
      <Text className='font-semibold'>{props.search}</Text>
    </TouchableOpacity>
  )
}

export default CardSuggestion
