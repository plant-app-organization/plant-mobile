import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

interface FirstPresentationScreenProps {}

const FirstPresentationScreen: React.FunctionComponent<FirstPresentationScreenProps> = (props) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      className='h-screen w-screen'
    >
      <View className='w-screen h-screen items-center justify-evenly px-10 pt-10'>
        <View className='mb-8 w-full flex justify-center items-center'>
          <Text style={{ color: '#3FA96A' }} className='font-Gentle text-4xl font-bold'>
            Plante.
          </Text>
          <Text
            style={{
              shadowColor: '#3FA96A',
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 3.22,
              shadowRadius: 5.1,
            }}
            className='font-antipasto text-white text-2xl font-bold'
          >
            Découvrez, achetez, vendez
          </Text>
        </View>
        <Image
          style={{
            width: '100%',
            height: '35%',
            marginTop: 10,
            shadowColor: '#3FA96A',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 3.22,
            shadowRadius: 5.1,
          }}
          source={require('../../assets/logo.png')}
        />
        <View className='w-full'>
          <Text className='font-antipasto text-black text-2xl font-bold mt-8 leading-8 text-center'>
            Achetez, vendez ou échangez vos{' '}
            <Text className='font-antipasto text-white font-bold'>plantes</Text> pour leur offrir
            une <Text className='font-antipasto text-white font-bold'>nouvelle vie</Text> 🌱
          </Text>
          <View className='flex items-center mt-10 mb-10'>
            <View
              style={{
                height: 40,
                width: 180,
                borderRadius: 25,
                backgroundColor: '#ccedcf',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#3FA96A',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 15.22,
                shadowRadius: 16.1,
              }}
            >
              <TouchableOpacity
                className='h-40 w-180 rounded-25 bg-ccedcf flex items-center justify-center shadow-lg hover:shadow-xl'
                onPress={() => navigation.navigate('SecondPresentationScreen')}
              >
                <Text className='font-antipasto text-black text-lg font-bold'>Suivant</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default FirstPresentationScreen;
