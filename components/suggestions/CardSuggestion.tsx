import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';

interface CardSuggestionProps {
  recherche: string;
  vues: number;
}

const CardSuggestion: React.FunctionComponent<CardSuggestionProps> = (props) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity className='pr-2' onPress={() => navigation.navigate('ListingScreen')}>
        <View className='flex flex-column w-full items-center p-4 border-green-50 border-solid rounded-2xl bg-green-100	 border'>
          <Text className='pl-0 pt-0 text-center'>{props.recherche}</Text>
          <Text className='pl-0 pt-0 text-xs justify-center items-center'>{props.vues} vues</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardSuggestion;
