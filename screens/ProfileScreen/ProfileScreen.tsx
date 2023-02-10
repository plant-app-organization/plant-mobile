import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text } from 'react-native';
import { Spinner } from 'native-base';

interface ProfileScreenProps {}

const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = (props) => {
  return (
    <View className='flex flex-column h-full justify-center items-center'>
      <Text className='p-4'>Profil</Text>
      <Text className='bg-black p-4 '>🪴🪴🪴🪴🪴🪴🪴🪴🪴🪴🪴</Text>
      <Spinner className='mt-10' color='indigo.500' />
    </View>
  );
};

export default ProfileScreen;
