import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';

interface CardSuggestionProps {
  search: string;
  views: number;
}

const CardSuggestion: React.FunctionComponent<CardSuggestionProps> = (props) => {
  const navigation = useNavigation();

  let backgroundColorStyle;

  if (props.search === 'Montserrat') {
    backgroundColorStyle = 'bg-orange-100';
  } else if (props.search === 'Lyrata') {
    backgroundColorStyle = 'bg-blue-100';
  } else if (props.search === 'Olivier') {
    backgroundColorStyle = 'bg-yellow-100';
  } else if (props.search === 'Plantes grasses') {
    backgroundColorStyle = 'bg-purple-100';
  } else if (props.search === 'Cactus') {
    backgroundColorStyle = 'bg-green-100';
  }

  return (
    <TouchableOpacity
      className={`w-[150px] rounded-2xl ${backgroundColorStyle} items-center py-5 mr-5 shadow-sm`}
      onPress={() => navigation.navigate('ListingScreen')}
    >
      <Text className='font-semibold'>{props.search}</Text>
      <Text>{props.views} vues</Text>
    </TouchableOpacity>
  );
};

export default CardSuggestion;
