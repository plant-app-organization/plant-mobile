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

interface PlantIdentityScreenProps {}

const PlantIdentityScreen: React.FunctionComponent<PlantIdentityScreenProps> = (props) => {
  const [filters, setFilters] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const navigation = useNavigation()

  const { data: searchOffersData, refetch: refetchSearchOffersData } = useSearchOffersQuery({
    variables: { searchInput, filters },
  })

  // console.log('DATA FROM REQUEST ⭐️', searchOffersData)

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#C0FFE7',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <LinearGradient
        // start={{ x: 0.1, y: 0 }}
        // end={{ x: 0.9, y: 0 }}
        colors={['#C0FFE7', 'white']}
        className='w-full h-[100px]'
      >
        <View className='w-full h-full flex flex-row items-center justify-around'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-[40px] h-[40px] justify-center items-center rounded-full blur-lg bg-white opacity-70'
          >
            <ChevronLeftIcon color={'black'} />
          </TouchableOpacity>
          <Text className='w-8/12 text-xl font-bold'>Carte d'identité des plantes</Text>
        </View>
      </LinearGradient>
      <View className='w-screen h-screen py-5 bg-white flex flex-row justify-evenly'>
        <TouchableOpacity className='w-[45%] h-[50%] items-center bg-white'>
          <Image
            source={require('../../assets/cards/aloe_vera_.jpeg')}
            contentFit='cover'
            className='w-full h-[50%] rounded-xl'
          />
          <View className='w-full items-center justify-around'>
            <View className='flex flex-row w-full justify-center items-center px-3 py-5'>
              <Text className='font-semibold'>Aloe Vera</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className='w-[45%] h-[50%] items-center bg-white'>
          <Image
            source={require('../../assets/cards/Dieffenbachia.jpeg')}
            contentFit='cover'
            className='w-full h-[50%] rounded-xl'
          />
          <View className='w-full items-center'>
            <View className='flex flex-row w-full justify-center items-center px-3 py-5'>
              <Text className='font-semibold'>Dieffenbachia</Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity>
                <Text>En savoir plus</Text>
              </TouchableOpacity> */}
        {/* <View className='flex flex-row w-full justify-between items-center px-5'>
              <Text className='font-semibold'>Origine</Text>
              <Text>Afrique et certaines îles {'\n'}de l'océan Indien</Text>
            </View>
            <View className='flex flex-row w-full justify-between items-center px-5'>
              <Text className='font-semibold'>Température</Text>
              <Text>supérieur à -3°C</Text>
            </View>
            <View className='flex flex-row w-full justify-between items-center px-5'>
              <Text className='font-semibold'>Pet friendly</Text>
              <Text>non toxique</Text>
            </View>
            <View className='flex flex-row w-full justify-between items-center px-5'>
              <Text className='font-semibold'>Floraison</Text>
              <Text>rare</Text>
            </View>
            <View className='flex flex-row w-full justify-between items-center px-5'>
              <Text className='font-semibold'>Dimensions</Text>
              <Text>50cm de hauteur</Text>
            </View>
            <View className='flex flex-row w-full justify-between items-center px-5'>
              <Text className='font-semibold'>Famille</Text>
              <Text>Liliacées</Text>
            </View>
            <View className='flex flex-row w-full justify-between items-center px-5'>
              <Text className='font-semibold'>Exposition</Text>
              <Text>très lumineuse</Text>
            </View>
            <View className='flex flex-row w-full justify-between items-center px-5'>
              <Text className='font-semibold'>Arrosage</Text>
              <Text>Lorsque la terre est sèche</Text>
            </View> */}
      </View>
    </SafeAreaView>
  )
}

export default PlantIdentityScreen
