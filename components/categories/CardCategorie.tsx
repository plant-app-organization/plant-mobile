import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';

import { Image } from 'expo-image';

import { ChevronRightIcon } from 'react-native-heroicons/solid';

interface CardCategorieProps {
  name: string;
  image: string;
}

const CardCategorie: React.FunctionComponent<CardCategorieProps> = (props) => {
  let backgroundColorCard;

  if (props.name === 'Tropicales') {
    backgroundColorCard = 'bg-red-200';
  } else if (props.name === 'Rares') {
    backgroundColorCard = 'bg-yellow-200';
  } else if (props.name === 'du Potager') {
    backgroundColorCard = 'bg-blue-200';
  } else if (props.name === 'Aromatiques') {
    backgroundColorCard = 'bg-green-200';
  } else if (props.name === 'Cactus') {
    backgroundColorCard = 'bg-purple-200';
  }

  return (
    <TouchableOpacity
      className={`w-[100%] h-[120px] ${backgroundColorCard} justify-center rounded-lg mb-3 relative`}
    >
      <Image
        source={{ uri: props.image }}
        className='w-full h-full rounded-lg opacity-30'
        contentFit='cover'
      />
      <View className='w-full h-full flex-row items-center justify-around absolute'>
        <Text className='font-semibold text-white	font-bold	text-2xl'>
          Plantes {'\n'} {props.name}
        </Text>
        <ChevronRightIcon color={'white'} className='h-6 w-6' />
      </View>
    </TouchableOpacity>
  );
};

export default CardCategorie;
