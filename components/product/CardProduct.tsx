import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';
import { HeartIcon } from 'react-native-heroicons/solid';

interface CardProductProps {
  name: string;
  prix: number;
  photo: string;
}

const CardProduct: React.FunctionComponent<CardProductProps> = (props) => {
  return (
    <View>
      <TouchableOpacity>
        <View className='flex flex-row w-40 items-start mr-2 h-48'>
          <ImageBackground
            source={{
              uri: props.photo,
            }}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'green',
              borderRadius: 30 / 2,
            }}
            imageStyle={{ borderRadius: 30 / 2, opacity: 0.8 }}
          ></ImageBackground>
        </View>
        <View className='flex flex-row justify-between items-center pr-2'>
          <View className='flex flex-column'>
            <Text className='pl-2 pt-2 font-semibold'>{props.prix}€</Text>
            <Text className='pl-2 pt-0'>{props.name}</Text>
          </View>
          <HeartIcon color={'#d8d8d8'} className='h-6 w-6 pr-2' />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardProduct;
