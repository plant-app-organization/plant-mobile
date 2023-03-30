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
    backgroundColorCard = 'bg-orange-100';
  } else if (props.name === 'Rares') {
    backgroundColorCard = 'bg-blue-100';
  } else if (props.name === 'du Potager') {
    backgroundColorCard = 'bg-yellow-100';
  } else if (props.name === 'Aromatiques') {
    backgroundColorCard = 'bg-purple-100';
  } else if (props.name === 'Cactus') {
    backgroundColorCard = 'bg-green-100';
  }

  return (
    <TouchableOpacity
      className={`w-[100%] h-[120px] flex flex-row items-center ${backgroundColorCard} rounded-lg mb-3 relative`}
    >
      <View className='w-6/12 h-full flex-row items-center'>
        <Text className='font-semibold text-slate-800	font-bold	text-xl ml-4'>
          Plantes {'\n'}
          {props.name}
        </Text>
      </View>

      <Image source={props.image} className='w-6/12 h-full rounded-lg' contentFit='cover' />
      <View className='w-[40px] h-[40px] justify-center items-center rounded-full blur-lg bg-white opacity-70 absolute right-5'>
        <ChevronRightIcon color={'black'} className='h-6 w-6 bg-orange-800' />
      </View>
    </TouchableOpacity>
  );
};

export default CardCategorie;
