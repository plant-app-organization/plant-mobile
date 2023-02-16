import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Avatar } from 'native-base';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

interface CardPlanterProps {}

const CardPlanter: React.FunctionComponent<CardPlanterProps> = (props) => {
  return (
    <View>
      <TouchableOpacity className='mr-6'>
        <View className='flex w-full justify-center items-center mr-0 mb-3 '></View>
        <Avatar
          alignSelf='center'
          bg='amber.500'
          size='lg'
          source={{
            uri: props.image,
          }}
        >
          JL
        </Avatar>
        <Text className='pl-0 pt-2 text-center'>{props.name}</Text>
        <Text className='pl-0 pt-0 text-xs justify-center items-center'>{props.deals}</Text>
      </TouchableOpacity>
    </View>
  );
};

CardPlanter.propTypes = {
  name: PropTypes.string,
  ventes: PropTypes.string,
  photo: PropTypes.string,
};

export default CardPlanter;
