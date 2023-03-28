import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { Image } from 'expo-image';
import { Avatar, ScrollView } from 'native-base';
import AuthorDisplay from '../../components/AuthorDisplay/AuthorDisplay';

import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import Swiper from 'react-native-swiper';
interface ListingScreenProps {}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const ListingScreen: React.FunctionComponent<ListingScreenProps> = (props) => {
  const [like, setLike] = useState(props.route.params.like);
  const [likesCounter, setLikesCounter] = useState<number | null>(props.route.params.likesCounter);
  console.log('props.route.params', props.route.params);
  console.log('like', like);
  const {
    authorId,
    category,
    createdAt,
    description,
    health,
    id,
    isActive,
    maintenanceDifficultyLevel,
    pictures,
    plantHeight,
    plantName,
    pot,
    price,
    updatedAt,
  } = props.route.params.listingData;
  const navigation = useNavigation();
  const handleLike = async () => {
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
    like && likesCounter ? setLikesCounter(likesCounter - 1) : setLikesCounter(likesCounter + 1);
    !like && likesCounter && setLikesCounter(likesCounter + 1);

    setLike(!like);

    console.log('ajout du like');
    !like &&
      toast.show({
        title: "L'annonce a été ajoutée à vos favoris !",
      });
    const response = await bookmarkOffer({
      variables: {
        offerId: props.id,
      },
    });
  };
  return (
    <View className='h-screen w-screen bg-white'>
      <View className='w-full h-[40%] relative'>
        <Swiper
          className='bg-green-100'
          style={styles.wrapper}
          showsButtons={false}
          dotColor={'white'}
          activeDotColor={'green'}
        >
          {pictures.map((imgUrl: string, index: number) => {
            return (
              <View style={styles.slide1} key={index}>
                <Image
                  className='w-full h-full'
                  source={imgUrl}
                  placeholder={blurhash}
                  contentFit='cover'
                />
              </View>
            );
          })}

          {/* <View style={styles.slide1}>
            <Image
              className='w-full h-full'
              source={pictures[0]}
              contentFit='cover'
              transition={1000}
            />
          </View> */}
        </Swiper>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='w-[50px] h-[50px] justify-center items-center rounded-full blur-lg bg-white opacity-70 absolute top-10 left-8'
        >
          <ChevronLeftIcon color={'black'} />
        </TouchableOpacity>
      </View>

      <View className='w-full h-[60%] bg-white flex-col py-6 relative'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='w-full flex flex-row  px-3'>
            <AuthorDisplay userId={authorId} />

            <View className='w-6/12 justify-center items-end'>
              <TouchableOpacity className='w-[150px] justify-center items-center py-2 border border-green-900 rounded-3xl shadow-2xl'>
                <Text className='text-green-900'>Contacter</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='h-[1px] w-[80%] bg-gray-300 my-5 relative ml-auto mr-auto' />

          <View className='flex flex-row  px-3'>
            <View className='w-8/12 flex-cols justify-between'>
              <Text className='text-2xl font-medium mb-4'>{plantName}</Text>
              <Text>
                <Text className='text-sm font-semibold'>Condition : </Text>
                <Text>{health}</Text>
              </Text>
              <Text className='my-1'>
                <Text className='text-sm font-semibold'>Taille : </Text>
                <Text>{plantHeight} cm</Text>
              </Text>
              <Text>
                <Text className='text-sm font-semibold'> Âge : </Text>
                <Text>29 ans</Text>
              </Text>
            </View>
            <View className='w-4/12 flex-col justify-around items-end'>
              <View className='flex-row items-center'>
                {likesCounter != null && likesCounter > 0 && (
                  <Text className='mr-1'>{likesCounter}</Text>
                )}
                <HeartIcon
                  color={likesCounter && likesCounter > 0 ? '#e74c3c' : '#d8d8d8'}
                  size={20}
                />
              </View>
              <Text className='text-2xl text-green-900'>{price} €</Text>
            </View>
          </View>

          <View className='h-[1px] w-[80%] bg-gray-300 my-5 relative ml-auto mr-auto' />

          <View className='flex-row justify-between my-5  px-3'>
            <TouchableOpacity className='w-[150px] justify-center items-center py-2 bg-green-900 rounded-3xl shadow-2xl'>
              <Text className='text-white'>Acheter</Text>
            </TouchableOpacity>
            <TouchableOpacity className='w-[150px] justify-center items-center py-2 border border-green-900 rounded-3xl shadow-2xl'>
              <Text className='text-green-900'>Faire une offre</Text>
            </TouchableOpacity>
          </View>

          <View className='h-[1px] w-[80%] bg-gray-300 my-5 relative ml-auto mr-auto' />

          <View className='px-3'>
            <Text className='text-xl font-normal mb-4'>Description</Text>
            <Text>{description}</Text>
          </View>
          <View className='h-[80px] w-full' />
        </ScrollView>
      </View>
    </View>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //   backgroundColor: 'green',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
