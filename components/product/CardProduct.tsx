import React, { useState, useRef } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { HeartIcon } from 'react-native-heroicons/solid';
import { Image } from 'expo-image';

import { useNavigation } from '@react-navigation/native';

interface CardProductProps {
  plantName: string;
  price: number;
  pictures: string[];
}

const CardProduct: React.FunctionComponent<CardProductProps> = (props) => {
  console.log('props dans carproduct', props);
  const [like, setLike] = useState(false);
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
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

    <TouchableOpacity
      className='w-1/2 px-2'
      onPress={() => navigation.navigate('Listing', { listingData: props })}
    >
      {props.pictures && (
        <Image
          className='rounded-lg bg-green-200 h-64'
          source={props.pictures[0]}
          // placeholder={blurHash}
          contentFit='cover'
          // transition={1000}
        />
      )}

      <View className='flex flex-row justify-between items-center pr-2'>
        <View className='flex flex-column'>
          <Text className='pl-2 pt-2 font-semibold'>{props.price},00 €</Text>
          <Text className='pl-2 pt-0'>{props.plantName}</Text>
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
