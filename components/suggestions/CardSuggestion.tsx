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
  return (
    <TouchableOpacity
      className='w-[150px] rounded-2xl bg-white items-center py-5 mr-5 shadow-sm'
      onPress={() => navigation.navigate('PlantProfileScreen')}
    >
      <Text className='font-semibold'>{props.search}</Text>
      <Text>{props.views} vues</Text>
    </TouchableOpacity>
  );
};

export default CardSuggestion;
