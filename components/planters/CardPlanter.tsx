import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Avatar } from 'native-base';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

interface CardPlanterProps {
  name: string;
  deals: number;
  image: string;
}

const CardPlanter: React.FunctionComponent<CardPlanterProps> = (props) => {
  return (
    <TouchableOpacity className='mr-5 bg-white py-3 px-2 shadow-sm rounded-lg'>
      <Avatar
        alignSelf='center'
        bg='amber.500'
        size='md'
        source={{
          uri: props.image,
        }}
      >
        JL
      </Avatar>
      <Text className='pt-2 font-semibold text-center'>{props.name}</Text>
      <Text className='text-xs text-gray-800'>{props.deals} plantdeals</Text>
    </TouchableOpacity>
  );
};

export default CardPlanter;
