import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Avatar, ScrollView } from 'native-base';

import { StarIcon } from 'react-native-heroicons/solid';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';

interface PlantProfileScreenProps {}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const PlantProfileScreen: React.FunctionComponent<PlantProfileScreenProps> = (props) => {
  const navigation = useNavigation();
  return (
    <View className='h-screen w-screen bg-white'>
      <View className='w-full h-[40%] relative'>
        <Image
          className='w-full h-full'
          source='https://www.schilliger.com/media/filer_public_thumbnails/filer_public/b9/51/b951865d-d491-421b-bf3f-8b52b58872c4/monstera-2.jpg__1170x0_q85_subsampling-2_upscale.jpg'
          placeholder={blurhash}
          contentFit='cover'
          transition={1000}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className='w-[50px] h-[50px] justify-center items-center rounded-full blur-lg bg-white opacity-70 absolute top-10 left-8'
        >
          <ChevronLeftIcon color={'black'} />
        </TouchableOpacity>
      </View>

      <View className='w-full h-[60%] bg-white flex-col py-6 relative'>
        <ScrollView>
          <View className='w-full flex flex-row  px-3'>
            <View className='w-6/12 flex-row items-center'>
              <Avatar
                bg='green.900'
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}
              >
                LC
              </Avatar>
              <View className='ml-2'>
                <Text className='text-base'>Lucas13007</Text>
                <View className='flex-row items-center mb-1'>
                  <StarIcon color={'orange'} size={20} />
                  <StarIcon color={'orange'} size={20} />
                  <StarIcon color={'orange'} size={20} />
                  <StarIcon color={'orange'} size={20} />
                  <Text>(139)</Text>
                </View>
                <Text>Marseille, France</Text>
              </View>
            </View>
            <View className='w-6/12 justify-center items-end'>
              <TouchableOpacity className='w-[150px] justify-center items-center py-2 border border-green-900 rounded-3xl shadow-2xl'>
                <Text className='text-green-900'>Contacter</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='h-[1px] w-[80%] bg-gray-300 my-5 relative ml-auto mr-auto' />

          <View className='flex flex-row  px-3'>
            <View className='w-8/12 flex-cols justify-between'>
              <Text className='text-2xl font-medium mb-4'>Géranium</Text>
              <Text>
                <Text className='text-sm font-semibold'>Condition : </Text>
                <Text>Très bon état</Text>
              </Text>
              <Text className='my-1'>
                <Text className='text-sm font-semibold'>Taille : </Text>
                <Text>78 cm</Text>
              </Text>
              <Text>
                <Text className='text-sm font-semibold'> Âge : </Text>
                <Text>29 ans</Text>
              </Text>
            </View>
            <View className='w-4/12 flex-col justify-around items-end'>
              <View className='flex-row items-center'>
                <Text className='mr-1'>13</Text>
                <HeartIcon color={'red'} size={20} />
              </View>
              <Text className='text-2xl text-green-900'>90.00 €</Text>
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
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, doloribus ipsam
              cum fugiat sit consequuntur explicabo. Quibusdam adipisci, dolores, praesentium vel,
              eveniet facere magnam vero tempore voluptate rerum commodi consequatur.
            </Text>
          </View>
          <View className='h-[80px] w-full' />
        </ScrollView>
      </View>
    </View>
  );
};

export default PlantProfileScreen;
