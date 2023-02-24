import React, { useState, useRef, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface FirstScreenLogoProps {}

const FirstScreenLogo: React.FunctionComponent<FirstScreenLogoProps> = (props) => {
  return (
    <LinearGradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      className='w-screen h-screen flex items-center justify-center'
    >
      <View className='h-200 flex items-center justify-center '>
        <Text
          style={{
            width: '100%',
            height: '28%',
            shadowColor: '#3FA96A',
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 3.22,
            shadowRadius: 5.1,
            fontSize: 58,
          }}
          className='font-Gentle text-white text-6xl'
        >
          Plante.
        </Text>

        <Text className='text-green-600 text-3xl -mt-4 font-LANENAR text-xl'>Seconde vie</Text>
      </View>
    </LinearGradient>
  );
};

export default FirstScreenLogo;
