import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, Button } from 'react-native';
import { Spinner } from 'native-base';
import { useNavigation } from '@react-navigation/native';
interface DevScreenProps {}
// comment
const DevScreen: React.FunctionComponent<DevScreenProps> = (props) => {
  const navigation = useNavigation();

  return (
    <View className='flex flex-column h-full justify-center items-center'>
      <Text className='p-4'>PLANT</Text>

      <Button
        className='p-4'
        title='Go to First Screen'
        onPress={() => navigation.navigate('FirstScreenLogo')}
      />

      <Button
        className='p-4'
        title='Go to Presentation1 Screen'
        onPress={() => navigation.navigate('FirstPresentationScreen')}
      />
      <Button
        className='p-4'
        title='Go to Presentation2 Screen'
        onPress={() => navigation.navigate('SecondPresentationScreen')}
      />
      <Button
        className='p-4'
        title='Go to Signup Screen'
        onPress={() => navigation.navigate('SignupScreen')}
      />
      <Button
        className='p-4'
        title='Go to Signin Screen'
        onPress={() => navigation.navigate('SigninScreen')}
      />

      <Button
        className='p-4'
        title='Go to Home Screen'
        onPress={() => navigation.navigate('BottomTabs')}
      />
      <Button
        className='p-4'
        title='Go to Favoris Screen'
        onPress={() => navigation.navigate('FavorisScreen')}
      />
      <Button
        className='p-4'
        title='Go to Param Screen'
        onPress={() => navigation.navigate('ParamScreen')}
      />
      <Button
        className='p-4'
        title='Go to Param Compte Screen'
        onPress={() => navigation.navigate('ParamCompteScreen')}
      />
    </View>
  );
};

export default DevScreen;
