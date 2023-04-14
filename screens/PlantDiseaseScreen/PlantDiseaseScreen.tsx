import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { LinearGradient } from 'expo-linear-gradient'
import { useSearchOffersQuery } from '../../graphql/graphql'
import Dropdown from '../../components/dropdown/Dropdown'

import { ChevronLeftIcon } from 'react-native-heroicons/solid'

import { DISEASE_DESCRIPTION } from '../../data/PlantDiseaseData'

const DISEASE_TITLE = [
  {
    id: '01',
    title: 'Les thrips',
  },
  {
    id: '02',
    title: 'Les moucherons',
  },
  {
    id: '03',
    title: 'Les araignées rouges',
  },

  {
    id: '04',
    title: 'Les fourmis',
  },
  {
    id: '05',
    title: 'Les cochenilles',
  },
  {
    id: '06',
    title: 'La rouille',
  },
  {
    id: '07',
    title: 'L’oïdium',
  },
  {
    id: '08',
    title: 'Pourriture des racines',
  },
]

interface PlantDiseaseScreenProps {}

const PlantDiseaseScreen: React.FunctionComponent<PlantDiseaseScreenProps> = (props) => {
  const [filters, setFilters] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [refreshing, setRefreshing] = useState<boolean>(false)
  // const [lastTitle, setLastTitle] = useState<string>('Arrosage')
  const [diseaseDescription, setDiseaseDescription] = useState<string>(
    DISEASE_DESCRIPTION.fallenLeaves,
  )

  const navigation = useNavigation()

  const { data: searchOffersData, refetch: refetchSearchOffersData } = useSearchOffersQuery({
    variables: { searchInput, filters },
  })

  // console.log('DATA FROM REQUEST ⭐️', searchOffersData)

  const selectTitle = (title) => {
    if (title === 'Les thrips') {
      setDiseaseDescription(DISEASE_DESCRIPTION.lesthrips)
    } else if (title === 'Les moucherons') {
      setDiseaseDescription(DISEASE_DESCRIPTION.lesmoucherons)
    } else if (title === 'Les araignées rouges') {
      setDiseaseDescription(DISEASE_DESCRIPTION.lesaraignéesrouges)
    } else if (title === 'Les fourmis') {
      setDiseaseDescription(DISEASE_DESCRIPTION.lesfourmis)
    } else if (title === 'Les cochenilles') {
      setDiseaseDescription(DISEASE_DESCRIPTION.lescochenilles)
    } else if (title === 'La rouille') {
      setDiseaseDescription(DISEASE_DESCRIPTION.larouille)
    } else if (title === 'L’oïdium') {
      setDiseaseDescription(DISEASE_DESCRIPTION.oïdium)
    } else if (title === 'Pourriture des racines') {
      setDiseaseDescription(DISEASE_DESCRIPTION.pourriture)
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      refetchSearchOffersData(), setRefreshing(false)
    })
  }, [])

  const onChangeText = (text: string) => {
    if (text.length > 2) {
      console.log('go', text)
    }
    setSearchInput(text)
  }
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFE2C0',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <LinearGradient
        // start={{ x: 0.1, y: 0 }}
        // end={{ x: 0.9, y: 0 }}
        colors={['#FFE2C0', 'white']}
        className='w-full h-[100px]'
      >
        <View className='w-full h-full flex flex-row items-center justify-around'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-[40px] h-[40px] justify-center items-center rounded-full blur-lg bg-white opacity-70'
          >
            <ChevronLeftIcon color={'black'} />
          </TouchableOpacity>
          <Text className='w-8/12 text-xl font-bold'>Que se passe-t-il ?</Text>
        </View>
      </LinearGradient>

      <View className='h-[80px] bg-white'>
        <FlatList
          data={DISEASE_TITLE}
          renderItem={({ item }) => <Dropdown title={item.title} selectTitle={selectTitle} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: '100%',
            alignItems: 'center',
            // backgroundColor: 'lightblue',
          }}
        />
      </View>

      <View className='h-full p-5 bg-white'>
        <Text className='text-lg text-justify'>{diseaseDescription}</Text>
      </View>
    </SafeAreaView>
  )
}

export default PlantDiseaseScreen
