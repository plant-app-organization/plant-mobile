import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { Spinner } from 'native-base';
import { HeartIcon } from 'react-native-heroicons/solid';
import { Image } from 'expo-image';

interface CardProductProps {
  name: string;
  prix: number;
  photo: string;
}

const CardProduct: React.FunctionComponent<CardProductProps> = (props) => {
  const [like, setLike] = useState(false);
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    setLike(!like);
    // Animate the icon
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  let heartIconStyle = { cursor: 'pointer', color: '#d8d8d8' };
  if (like) {
    heartIconStyle = { color: '#e74c3c', cursor: 'pointer' };
  }

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <TouchableOpacity className='w-[150px] h-[240px] mr-5 rounded-lg bg-white'>
      <Image
        source={props.photo}
        contentFit='cover'
        transition={1000}
        className='w-full h-[80%] rounded-t-lg'
      />

      <View className='h-[20%] w-full flex-row justify-between items-center'>
        <View className='h-full justify-evenly'>
          <Text className='font-semibold'>{props.prix}€</Text>
          <Text>{props.name}</Text>
        </View>
        <TouchableOpacity>
          <Animated.View style={[{ transform: [{ scale: scaleAnimation }] }]}>
            <HeartIcon
              color={'#d8d8d8'}
              className='h-6 w-6 pr-2'
              onPress={() => handleLike()}
              style={heartIconStyle}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CardProduct;
