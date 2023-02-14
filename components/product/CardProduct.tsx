import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, ImageBackground } from 'react-native';
import { Spinner } from 'native-base';
import { HeartIcon } from 'react-native-heroicons/solid';

interface CardProductProps {}

const CardProduct: React.FunctionComponent<CardProductProps> = (props) => {
  return (
    <View>
      <View className='flex flex-row h-3/5 w-40 items-start mr-2 h-48'>
        <ImageBackground
          source={{
            uri: 'https://thumbs.dreamstime.com/z/plante-plante-green-flower-sun-summer-154287762.jpg',
          }}
          style={{ width: '100%', height: '100%' }}
          imageStyle={{ borderRadius: 30 / 2 }}
        ></ImageBackground>
      </View>
      <View className='flex flex-row justify-between items-center'>
        <View className='flex flex-column'>
          <Text className='pl-2 pt-2 font-semibold'>{props.prix}</Text>
          <Text className='pl-2 pt-0'>{props.name}</Text>
        </View>
        <HeartIcon color={'#8CE795'} className='h-6 w-6 ' />
      </View>
    </View>
  );
};

CardProduct.propTypes = {
  name: PropTypes.string,
  prix: PropTypes.string,
  photo: PropTypes.string,
};

export default CardProduct;
