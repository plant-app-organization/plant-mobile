import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'expo-image';

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'native-base';

interface ParamScreenProps {}

const ParamScreen: React.FunctionComponent<ParamScreenProps> = (props) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#f2fff3', '#bee6c2', '#f2fff3', '#f2fff3', '#f2fff3', '#bee6c2']}
      className='h-screen w-screen '
    >
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        className='h-screen w-screen flex-1 justify-start items-center'
      >
        <View className='w-screen items-center'>
          <Image
            style={{
              width: 130,
              height: 120,

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
        </View>
        <TouchableOpacity
          className='w-screen items-center flex-row flex-1 justify-start'
          onPress={() => navigation.navigate('ParamCompteScreen')}
        >
          <View className='w-screen items-center flex-row flex-1 justify-start p-2'>
            <Text className='text-lg font-Roboto  ml-3'>Paramétres du compte </Text>
          </View>
          <View></View>
        </TouchableOpacity>
        <View className='h-px w-screen bg-black opacity-30' />
        <TouchableOpacity
          className='w-screen items-center flex-row flex-1 justify-start'
          onPress={console.log('parametres')}
        >
          <View className='w-screen items-center flex-row flex-1 justify-start p-2'>
            <Text className='text-lg font-Roboto  ml-3'> Paiements </Text>
          </View>
          <View></View>
        </TouchableOpacity>

        <View className='h-px w-screen bg-black opacity-30' />
        <View>
          <Checkbox colorScheme='green' value='one' my={2}>
            Notifier le vendeur lorsque je mets son article en favoris
          </Checkbox>
          <Checkbox colorScheme='green' value='one' my={2}>
            Autoriser les notifications push
          </Checkbox>
          <Checkbox colorScheme='green' value='one' my={2}>
            Autoriser les notifications e-mail
          </Checkbox>
        </View>
        <View className='flex items-center mt-10 mb-10'>
          <View
            style={{
              height: 40,
              width: 200,
              borderRadius: 15,
              backgroundColor: '#ccedcf',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#3FA96A',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 1.22,
              shadowRadius: 1.1,
            }}
          >
            <TouchableOpacity
              className='h-40 w-200 rounded-10 bg-ccedcf flex items-center justify-center shadow-lg hover:shadow-xl'
              onPress={() => navigation.navigate('ProfileScreen')}
            >
              <Text className='font-Roboto  text-black text-lg font-bold'>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className='flex items-center mt-10 mb-10'>
          <View
            style={{
              height: 40,
              width: 200,

              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#3FA96A',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 1.22,
              shadowRadius: 1.1,
            }}
          >
            <TouchableOpacity
              className='h-40 w-200 rounded-10 bg-ccedcf flex items-center justify-center shadow-lg hover:shadow-xl'
              onPress={console.log('photo')}
            >
              <Text className='font-Roboto  text-black text-lg font-bold'>Deconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity className=' items-center' onPress={console.log('ventes')}>
          <Text className='text-s text-red-500 font-Roboto  ml-3'>Supprimer mon compte </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ParamScreen;
