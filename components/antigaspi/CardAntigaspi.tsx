import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';
import { ChevronRightIcon, ShoppingBagIcon } from 'react-native-heroicons/solid';

interface CardAntigaspiProps {
  entreprise: string;
  ville: string;
  photo: string;
  panier: string;
}

const CardAntigaspi: React.FunctionComponent<CardAntigaspiProps> = (props) => {
  return (
    <View>
      <TouchableOpacity>
        <View className='flex flex-row w-80 items-center justify-between mr-2 h-48'>
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
            imageStyle={{ borderRadius: 30 / 2, opacity: 0.7 }}
            className='flex-row w-80 items-center justify-between mr-2 h-48'
          >
            <View className='flex-column items-start justify-center h-48 ml-3'>
              <View>
                <Text className='pl-2 font-semibold text-white	font-bold	text-2xl tracking-wider'>
                  {props.entreprise}
                </Text>
                <Text className='pl-2 text-white font-normal text-sm tracking-wider'>
                  {props.ville}
                </Text>
              </View>
              <View className='flex-row mt-4 p-2 border-green-50 border-solid rounded-2xl border'>
                <ShoppingBagIcon color={'white'} className='' />
                <Text className='pl-2 pt-1 text-white font-semibold text-sm tracking-wider'>
                  {props.panier}
                </Text>
              </View>
            </View>
            <View className='mr-4'>
              <ChevronRightIcon color={'white'} className='h-6 w-6 pr-2 ' />
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardAntigaspi;
