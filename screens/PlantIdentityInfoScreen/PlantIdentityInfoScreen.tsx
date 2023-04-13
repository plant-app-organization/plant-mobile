import React, { useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import { useSearchOffersQuery } from '../../graphql/graphql'

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native'

import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'

import { ChevronLeftIcon } from 'react-native-heroicons/solid'

interface PlantIdentityInfoScreenProps {
  route: {
    params: {
      name: string
      image: string
      origin: string
      temperature: string
      petFriendly: string
      flowering: string
      dimension: string
      family: string
      exposition: string
      watering: string
    }
  }
}

const PlantIdentityInfoScreen: React.FunctionComponent<PlantIdentityInfoScreenProps> = ({
  route,
}) => {
  const [filters, setFilters] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState<string>('')

  const {
    name,
    image,
    origin,
    temperature,
    petFriendly,
    dimension,
    flowering,
    family,
    exposition,
    watering,
  } = route.params

  const navigation = useNavigation()

  const { data: searchOffersData, refetch: refetchSearchOffersData } = useSearchOffersQuery({
    variables: { searchInput, filters },
  })

  // console.log('DATA FROM REQUEST ⭐️', searchOffersData)

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View className='w-screen h-screen justify-between'>
        <View className='w-full h-3/6 relative'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-[45px] h-[45px] justify-center items-center rounded-full border border-gray-200 bg-white opacity-50 absolute top-8 left-8 z-10 shadow'
          >
            <ChevronLeftIcon color={'black'} />
          </TouchableOpacity>

          <Image source={image} contentFit='cover' className='w-full h-full' />
        </View>

        <View className='w-full h-[5%] items-center justify-center'>
          <Text className='text-lg font-semibold'>{name}</Text>
        </View>

        <View className='w-full h-[45%]'>
          <View className='mb-3 mt-3 flex flex-row'>
            <Text className='text-md font-semibold w-4/12 ml-3 text-[15px]'>Origine</Text>
            <Text className='ml-2'>{origin}</Text>
          </View>
          <View className='mb-3 flex flex-row'>
            <Text className='text-md font-semibold w-4/12 ml-3 text-[15px]'>Température</Text>
            <Text className='ml-2'>{temperature}</Text>
          </View>
          <View className='mb-3 flex flex-row'>
            <Text className='text-md font-semibold w-4/12 ml-3 text-[15px]'>Pour les animaux</Text>
            <Text className='ml-2'>{petFriendly}</Text>
          </View>
          <View className='mb-3 flex flex-row'>
            <Text className='text-md font-semibold w-4/12 ml-3 text-[15px]'>Floraison</Text>
            <Text className='ml-2'>{flowering}</Text>
          </View>
          <View className='mb-3 flex flex-row'>
            <Text className='text-md font-semibold w-4/12 ml-3 text-[15px]'>Famille</Text>
            <Text className='ml-2'>{family}</Text>
          </View>
          <View className='mb-3 flex flex-row'>
            <Text className='text-md font-semibold w-4/12 ml-3 text-[15px]'>Exposition</Text>
            <Text className='ml-2'>{exposition}</Text>
          </View>
          <View className='mb-3 flex flex-row'>
            <Text className='text-md font-semibold w-4/12 ml-3 text-[15px]'>Dimension</Text>
            <Text className='ml-2'>{dimension}</Text>
          </View>
          <View className='mb-3 flex flex-row'>
            <Text className='text-md font-semibold w-4/12 ml-3 text-[15px]'>Arrosage</Text>
            <Text className='ml-2'>{watering}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default PlantIdentityInfoScreen
