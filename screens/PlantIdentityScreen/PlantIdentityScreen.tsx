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

const PLANT_IDENTITY_DATA = [
  {
    id: '01',
    name: 'Aloe Vera',
    image: require('../../assets/cards/aloe_vera_.jpeg'),
    origin: "Afrique et certaines îles \nde l'océan Indien",
    temperature: 'supérieure à 3°C',
    petFriendly: 'non toxique',
    flowering: 'rare',
    dimension: 'environ 50cm de hauteur',
    family: 'Liliacées',
    exposition: 'soleil',
    watering: 'Lorsque la terre est sèche',
  },
  {
    id: '02',
    name: 'Crassula',
    image: require('../../assets/cards/Crassula.jpeg'),
    origin: 'Afrique du sud',
    temperature: 'supérieure à 7°C',
    petFriendly: 'toxique',
    flowering: 'jolies fleurs blanches',
    dimension: 'environ 1m de hauteur',
    family: 'Crassulacées',
    exposition: 'mi-soleil, mi-ombre',
    watering: 'lorsque la terre est sèche',
  },
  {
    id: '03',
    name: 'Ficus Bonsaï',
    image: require('../../assets/cards/Ficus_bonsai.jpeg'),
    origin: 'Asie tropicale',
    temperature: 'Entre 15°C et 25°C',
    petFriendly: 'toxique',
    flowering: 'non',
    dimension: 'Environ 50cm de hauteur',
    family: 'Moracées',
    exposition: 'soleil',
    watering: 'Lorsque la terre est sèche',
  },
  {
    id: '04',
    name: 'Sansevieria',
    image: require('../../assets/cards/Sansevieria.jpeg'),
    origin: 'Afrique',
    temperature: 'entre 15°C et 24°C',
    petFriendly: 'toxique',
    flowering: 'rare',
    dimension: 'entre 15 et 70cm de hauteur',
    family: 'Liliacées',
    exposition: 'soleil',
    watering: 'tous les 15 jours',
  },
  {
    id: '05',
    name: 'Echinocereus',
    image: require('../../assets/cards/Echinocereus.jpeg'),
    origin: 'Amérique',
    temperature: 'supérieure à 12°C',
    petFriendly: 'non toxique',
    flowering: 'floraison au printemps',
    dimension: 'différente selon les variétées',
    family: 'Cactacées',
    exposition: 'soleil',
    watering: 'burmiser tous les 15 jours',
  },
  {
    id: '06',
    name: 'Oxalis',
    image: require('../../assets/cards/Oxalis.jpeg'),
    origin: 'Amérique du sud',
    temperature: '18°C',
    petFriendly: 'toxique',
    flowering: 'mai à juillet',
    dimension: 'environ 50cm de hauteur',
    family: 'Oxalidacées',
    exposition: 'soleil',
    watering: 'lorsque la terre est à peine humide',
  },
  {
    id: '07',
    name: 'Maranta',
    image: require('../../assets/cards/maranta.jpeg'),
    origin: 'Amérique du sud',
    temperature: 'supérieure à 15°C',
    petFriendly: 'non toxique',
    flowering: 'floraison en été',
    dimension: 'environ 30cm de hauteur \net de largeur',
    family: 'Marantacées',
    exposition: 'mi soleil',
    watering: 'tous les 5 jours',
  },
]

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
