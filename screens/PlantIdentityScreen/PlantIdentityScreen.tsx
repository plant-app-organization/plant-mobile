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
import PlantIdentityCard from '../../components/Cards/PlantIdentityCard'

import { PLANT_IDENTITY_DATA } from '../../data/PlantIdentityData'

interface PlantIdentityScreenProps {
  item: string
}

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
      <View className='w-screen bg-white'>
        <Text className='text-gray-900 ml-7 mb-4'>
          Total : {PLANT_IDENTITY_DATA.length} plantes
        </Text>
        <FlatList
          data={PLANT_IDENTITY_DATA}
          renderItem={({ item }) => (
            <View style={{ width: '100%', flex: 1 }}>
              <PlantIdentityCard
                name={item.name}
                image={item.image}
                origin={item.origin}
                temperature={item.temperature}
                petFriendly={item.petFriendly}
                flowering={item.flowering}
                dimension={item.dimension}
                family={item.family}
                exposition={item.exposition}
                watering={item.watering}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            width: '100%',
            paddingTop: 50,
            paddingBottom: 250,
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default PlantIdentityScreen
