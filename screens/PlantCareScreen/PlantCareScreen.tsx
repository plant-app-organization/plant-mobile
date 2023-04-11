import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  View,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { LinearGradient } from 'expo-linear-gradient'
import { useSearchOffersQuery } from '../../graphql/graphql'
import Dropdown from '../../components/dropdown/Dropdown'

import { ChevronLeftIcon } from 'react-native-heroicons/solid'

interface PlantCareScreen {}

const EntretienScreen: React.FunctionComponent<PlantCareScreen> = (props) => {
  const [filters, setFilters] = useState<string[]>([])

  const [searchInput, setSearchInput] = useState<string>('')
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { data: searchOffersData, refetch: refetchSearchOffersData } = useSearchOffersQuery({
    variables: { searchInput, filters },
  })

  // console.log('DATA FROM REQUEST ⭐️', searchOffersData)

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
  const navigation = useNavigation()

  return (
    <LinearGradient
      colors={['#cfe9f1', '#eafdf4', '#FEFFFF']}
      className='w-screen h-screen flex items-center justify-center'
    >
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor='#87BC23'
              colors={['#87BC23', '#139DB8']}
            />
          }
        >
          <View className='w-full h-[100px] flex flex-row items-center justify-evenly'>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className='w-[50px] h-[50px] justify-center items-center rounded-full blur-lg bg-white opacity-70'
            >
              <ChevronLeftIcon color={'black'} />
            </TouchableOpacity>
            <TextInput
              className='font-Roboto w-[70%] border-green-50 border-solid bg-white text-left rounded-2xl border ml-4 p-3'
              placeholder='Rechercher une plante'
              value={searchInput}
              onChangeText={onChangeText}
              placeholderTextColor='#000'
            />
          </View>

          <View className='h-[20px] w-full' />
          <View className='w-full bg-blue'>
            <Text className='ml-4 mb-5 text-xl font-semibold'>Comment les entretenir ?</Text>
            <Dropdown
              title="L'arrosage"
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, accusantium earum. Nemo reprehenderit odit, quae similique itaque ad eligendi quas natus aliquam possimus, non quidem necessitatibus ducimus dicta aut officia.'
            />
            <Dropdown
              title='La lumière'
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, accusantium earum. Nemo reprehenderit odit, quae similique itaque ad eligendi quas natus aliquam possimus, non quidem necessitatibus ducimus dicta aut officia.'
            />
            <Dropdown
              title='La température'
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, accusantium earum. Nemo reprehenderit odit, quae similique itaque ad eligendi quas natus aliquam possimus, non quidem necessitatibus ducimus dicta aut officia.'
            />
            <Dropdown
              title='Le rempotage'
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, accusantium earum. Nemo reprehenderit odit, quae similique itaque ad eligendi quas natus aliquam possimus, non quidem necessitatibus ducimus dicta aut officia.'
            />
          </View>

          <View className='h-[50px] w-full' />

          <View className='w-full'>
            <Text className='ml-4 mb-5 text-xl font-semibold'>Que se passe t'il ?</Text>
            <Dropdown
              title='Moucherons'
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, accusantium earum. Nemo reprehenderit odit, quae similique itaque ad eligendi quas natus aliquam possimus, non quidem necessitatibus ducimus dicta aut officia.'
            />
            <Dropdown
              title='Feuilles jaunes'
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, accusantium earum. Nemo reprehenderit odit, quae similique itaque ad eligendi quas natus aliquam possimus, non quidem necessitatibus ducimus dicta aut officia.'
            />
            <Dropdown
              title='Moisissures'
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, accusantium earum. Nemo reprehenderit odit, quae similique itaque ad eligendi quas natus aliquam possimus, non quidem necessitatibus ducimus dicta aut officia.'
            />
            <Dropdown
              title='Maladies et nuisibles'
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, accusantium earum. Nemo reprehenderit odit, quae similique itaque ad eligendi quas natus aliquam possimus, non quidem necessitatibus ducimus dicta aut officia.'
            />
          </View>

          <View className='h-[50px] w-full' />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default EntretienScreen
