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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient';

import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';

interface UserProfileScreenProps {}

const UserProfileScreen: React.FunctionComponent<UserProfileScreenProps> = (props) => {
  console.log('🔥props.route.params dans UserProfileScreen', props.route.params);
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[
        '#f2fff3',
        '#e2f7f6',
        '#f0fafb',
        '#fdf5fb',
        '#f2fff3',
        '#e2f7f6',
        '#f0fafb',
        '#fdf5fb',
      ]}
      className='h-screen w-screen flex-1'
    >
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        className='h-screen w-screen flex-1 justify-between'
      >
        <View className='flex-1 items-center pr-10 pl-10'>
          <Text>UserProfileScreen</Text>
          <Text> Nom du user : {props.route.params.userData.userName}</Text>
          <Text>
            TOutes les infos du user sont disponibles dans props.route.params.userData.userName ==>>>>A
            vous de jouer la team frontend vous nous faites un truc à la Airbnb au moins
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='w-[50px] h-[50px] justify-center items-center rounded-full blur-lg bg-white opacity-70 absolute top-10 left-8'
        >
          <ChevronLeftIcon color={'black'} />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UserProfileScreen;
