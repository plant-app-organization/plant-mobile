import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

interface CardSuggestionProps {}

const CardSuggestion: React.FunctionComponent<CardSuggestionProps> = (props) => {
  return (
    <View>
      <TouchableOpacity className='pr-2'>
        <View className='flex flex-column w-full items-center p-4 border-green-50 border-solid rounded-2xl bg-green-100	 border'>
          <Text className='pl-0 pt-0 text-center'>{props.recherche}</Text>
          <Text className='pl-0 pt-0 text-xs justify-center items-center'>{props.vues}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

CardSuggestion.propTypes = {
  recherche: PropTypes.string,
  vues: PropTypes.string,
};

export default CardSuggestion;
