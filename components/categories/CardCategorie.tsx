import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

interface CardCategorieProps {
  name: string;
  image: string;
}

const CardCategorie: React.FunctionComponent<CardCategorieProps> = (props) => {
  return (
    <TouchableOpacity className='w-[100%] bg-blue-100 h-[120px] mb-3'>
      <View>
        <ImageBackground
          source={{
            uri: props.image,
          }}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            borderRadius: 30 / 2,
          }}
          imageStyle={{ borderRadius: 30 / 2, opacity: 0.67 }}
        >
          <View className='flex-row items-center justify-between h-36	mr-3 ml-3'>
            <Text className='pl-2 font-semibold text-white	font-bold	text-2xl tracking-wider'>
              Plantes {'\n'} {props.name}
            </Text>
            <ChevronRightIcon color={'white'} className='h-6 w-6 pr-2 ' />
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default CardCategorie;
