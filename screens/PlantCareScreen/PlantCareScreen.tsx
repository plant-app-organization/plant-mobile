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

const CARING_TITLE = [
  {
    id: '01',
    title: 'Arrosage',
  },
  {
    id: '02',
    title: 'Luminosité',
  },
  {
    id: '03',
    title: 'Température',
  },

  {
    id: '04',
    title: 'Rempotage',
  },
]

const CARING_DESCRIPTION = {
  watering: "Description pour l'arrosage",
  brightness: 'Description pour la luminosité',
  temperature: 'Description pour la temparature',
  potting: 'Description pour rempotage',
}

interface PlantCareScreenProps {}

const PlantCareScreen: React.FunctionComponent<PlantCareScreenProps> = (props) => {
  const [filters, setFilters] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [refreshing, setRefreshing] = useState<boolean>(false)
  // const [lastTitle, setLastTitle] = useState<string>('Arrosage')
  const [caringDescription, setCaringDescription] = useState<string>(CARING_DESCRIPTION.watering)

  const navigation = useNavigation()

  const { data: searchOffersData, refetch: refetchSearchOffersData } = useSearchOffersQuery({
    variables: { searchInput, filters },
  })

  // console.log('DATA FROM REQUEST ⭐️', searchOffersData)

  const selectTitle = (title) => {
    if (title === 'Luminosité') {
      setCaringDescription(CARING_DESCRIPTION.brightness)
    } else if (title === 'Température') {
      setCaringDescription(CARING_DESCRIPTION.temperature)
    } else if (title === 'Arrosage') {
      setCaringDescription(CARING_DESCRIPTION.watering)
    } else if (title === 'Rempotage') {
      setCaringDescription(CARING_DESCRIPTION.potting)
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
        backgroundColor: '#CFF5FF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <LinearGradient
        // start={{ x: 0.1, y: 0 }}
        // end={{ x: 0.9, y: 0 }}
        colors={['#CFF5FF', 'white']}
        className='w-full h-[100px]'
      >
        <View className='w-full h-full flex flex-row items-center justify-around'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-[40px] h-[40px] justify-center items-center rounded-full blur-lg bg-white opacity-70'
          >
            <ChevronLeftIcon color={'black'} />
          </TouchableOpacity>
          <Text className='w-8/12 text-xl font-bold'>L'entretien</Text>
        </View>
      </LinearGradient>

      <View className='h-[80px] bg-white'>
        <FlatList
          data={CARING_TITLE}
          renderItem={({ item }) => <Dropdown title={item.title} selectTitle={selectTitle} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: '100%',
            alignItems: 'center',
            display: 'flex',
          }}
        />
      </View>

      <View className='h-full p-5 bg-white'>
        <Text className='text-lg text-justify'>{caringDescription}</Text>
      </View>
    </SafeAreaView>
  )
}

export default PlantCareScreen
