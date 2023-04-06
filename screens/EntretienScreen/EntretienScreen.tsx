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
import { LinearGradient } from 'expo-linear-gradient'
import { useSearchOffersQuery } from '../../graphql/graphql'
import CardDeal from '../../components/super-deals/CardDeal'
import CardDeal2 from '../../components/super-deals/CardDeal2'
import CardDeal3 from '../../components/super-deals/CardDeal3'

interface EntretienScreenProps {}

const EntretienScreen: React.FunctionComponent<EntretienScreenProps> = (props) => {
  const [filters, setFilters] = useState<string[]>([])

  const [searchInput, setSearchInput] = useState<string>('')
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { data: searchOffersData, refetch: refetchSearchOffersData } = useSearchOffersQuery({
    variables: { searchInput, filters },
  })

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

  const dealData: { Name: string; photo: string }[] = [
    {
      Name: 'la rouuille',

      photo:
        'https://i.ibb.co/km3V7wX/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-79207055-49ff-4af2-94bb-d4589ab29ca.png',
    },
    {
      Name: 'L’oïdium',

      photo:
        'https://i.ibb.co/km3V7wX/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-79207055-49ff-4af2-94bb-d4589ab29ca.png',
    },
    {
      Name: 'Pourriture des racines',

      photo:
        'https://i.ibb.co/CKgsZ9v/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-0e9fca9d-9962-47db-824e-ec52ca710d5.png',
    },
  ]
  const dealData2: { Name: string; photo: string }[] = [
    {
      Name: 'Les thrips',

      photo:
        'https://i.ibb.co/km3V7wX/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-79207055-49ff-4af2-94bb-d4589ab29ca.png',
    },
    {
      Name: 'Les araignées rouges',

      photo:
        'https://i.ibb.co/km3V7wX/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-79207055-49ff-4af2-94bb-d4589ab29ca.png',
    },
    {
      Name: 'Les moucherons de terreau',

      photo:
        'https://i.ibb.co/CKgsZ9v/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-0e9fca9d-9962-47db-824e-ec52ca710d5.png',
    },
    {
      Name: 'Les fourmis',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Les cochenilles',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
  ]
  const dealData3: { Name: string; photo: string }[] = [
    {
      Name: 'Pothos',

      photo:
        'https://i.ibb.co/km3V7wX/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-79207055-49ff-4af2-94bb-d4589ab29ca.png',
    },
    {
      Name: 'Ficus',

      photo:
        'https://i.ibb.co/km3V7wX/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-79207055-49ff-4af2-94bb-d4589ab29ca.png',
    },
    {
      Name: 'Monstera Deliciosa',

      photo:
        'https://i.ibb.co/CKgsZ9v/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-0e9fca9d-9962-47db-824e-ec52ca710d5.png',
    },
    {
      Name: 'Zamioculcas Zamiifolia',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Maranta',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Sansevieria',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Calathéa',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Pachira aquatica',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Piléa',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Echinocereus coccineus',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Tradescantia',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Yucca',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Crassula ovata',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Orchidée phalaenopsis',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Dieffenbachia',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Fittonia',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Aloe vera',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Ficus bonsaï',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Oxalis pourpre',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Mimosa pudica',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Stepania erecta',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Tillandsia',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Lithops',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      Name: 'Frizzle sizzle',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
  ]

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
          <TextInput
            className='font-Roboto w-11/12 border-green-50 border-solid bg-white  text-left  rounded-2xl border ml-4 p-3 mr-4 mt-4'
            placeholder='Rechercher une plante'
            value={searchInput}
            onChangeText={onChangeText}
            placeholderTextColor='#000'
          />
          <View className='h-[50px] w-full' />
          <View className='w-full bg-blue'>
            <Text className='pl-5 text-lg '>Les fiches plantes 🪴 </Text>
            <FlatList
              data={dealData3}
              renderItem={({ item }) => <CardDeal3 Name={item.Name} photo={item.photo} />}
              keyExtractor={(item) => item.key}
              horizontal={true}
              contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
            />
          </View>
          <View className='h-[10px] w-full' />

          <View className='w-full'>
            <Text className='pl-5 text-lg '>Maladies 🦠 </Text>
            <FlatList
              data={dealData}
              renderItem={({ item }) => <CardDeal Name={item.Name} photo={item.photo} />}
              keyExtractor={(item) => item.key}
              horizontal={true}
              contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
            />
          </View>
          <View className='h-[10px] w-full' />
          <View className='w-full'>
            <Text className='pl-5 text-lg '>Nuisibles 🪰</Text>
            <FlatList
              data={dealData2}
              renderItem={({ item }) => <CardDeal2 Name={item.Name} photo={item.photo} />}
              keyExtractor={(item) => item.key}
              horizontal={true}
              contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default EntretienScreen
