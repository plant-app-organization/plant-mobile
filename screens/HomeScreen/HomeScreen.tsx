import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  StatusBar,
  Platform,
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from 'react-native'

import { Image } from 'expo-image'
import MaskedView from '@react-native-masked-view/masked-view'

import { ChevronRightIcon, Skeleton } from 'native-base'
import PlantersDisplay from '../../components/PlantersDisplay/PlantersDisplay'
import CardProduct from '../../components/product/CardProduct'
import CardDeal from '../../components/super-deals/CardDeal'
import CardCategorie from '../../components/categories/CardCategorie'

import { Avatar } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { NoDeprecatedCustomRule } from 'graphql'
import { useUser } from '@clerk/clerk-expo'
import { useGetUserBookmarksLazyQuery, useGetMyUserDataQuery } from '../../graphql/graphql'
import { useNavigation } from '@react-navigation/native'
import { useReactiveVar } from '@apollo/client'
import { bookmarksVar } from '../../variables/bookmarks'
import { userDataVar, updateUserData, UserData } from '../../variables/userData'

import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import SuggestionsDisplay from '../../components/SuggestionsDisplay/SuggestionsDisplay'
import { registerIndieID } from 'native-notify'

interface HomeScreenProps {}
//
const HomeScreen: React.FunctionComponent<HomeScreenProps> = (props) => {
  const userDataInDevice = useReactiveVar(userDataVar)

  const { data: userData, loading: userDataLoading, error } = useGetMyUserDataQuery()

  useEffect(() => {
    if (!userDataLoading && userData) {
      console.log('00000userData in Home', userData)
      updateUserData('bio', userData.userData?.userBio)
      updateUserData('avatar', userData.userData?.avatar)
      updateUserData('avatarThumbnail', userData.userData?.avatarThumbnail)
      updateUserData('email', userData.userData?.email)
      registerIndieID(userData.userData?.email, 15168, '2NQv5UM3ppjj8VIDgMfgb4')
    }
  }, [userData, userDataLoading])
  const [search, setSearch] = useState<string>('')
  const { isSignedIn, user } = useUser()
  // const { getToken } = useAuth();
  const { width, height } = useWindowDimensions()
  const [getUserBookmarks, { data: userBookmarks }] = useGetUserBookmarksLazyQuery()

  useEffect(() => {
    if (isSignedIn) {
      // Lancer la requête de bookmarks seulement si l'utilisateur est connecté
      getUserBookmarks()
    }
  }, [isSignedIn, getUserBookmarks])
  console.log('userBookmarks', userBookmarks)
  userBookmarks && bookmarksVar(userBookmarks?.userBookmarks)
  // console.log('user clerk ', user);
  const navigation = useNavigation()

  const categorieData: { name: string; image: string }[] = [
    {
      name: 'Tropicales',
      image: require('../../assets/categories/tropicPlant.png'),
    },
    {
      name: 'Rares',
      image: require('../../assets/categories/starPlant.png'),
    },
    {
      name: 'Cactus',
      image: require('../../assets/categories/cactusPlant.png'),
    },
    {
      name: 'Aromatiques',
      image: require('../../assets/categories/basilicPlant02.png'),
    },
    {
      name: 'du Potager',
      image: require('../../assets/categories/tomatePlant.png'),
    },
  ]

  const inputRef = useRef(null)

  const navigateToMapSearchScreen = () => {
    inputRef.current?.blur()
    navigation.navigate('Search', {
      comingFromHomeScreenInput: true,
    })
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#A0C7AC',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{ backgroundColor: '#A0C7AC' }}
        className={`w-screen flex-col items-center ${
          Platform.OS === 'android' ? 'pt-1' : 'pt-0'
        } pb-1 px-3`}
      >
        {isSignedIn && (
          <View
            className={`w-full rounded-md flex flex-row  shadow py-2 px-3  bg-white ${
              Platform.OS === 'android' ? 'mt-0' : ''
            }`}
          >
            {userDataLoading ? (
              <Skeleton
                borderWidth={0}
                borderColor='coolGray.200'
                endColor='warmGray.50'
                size='12'
                rounded='full'
                alignSelf={'center'}
              />
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Avatar
                  style={{}}
                  bg='warmGray.50'
                  source={{
                    uri: userDataInDevice.avatar,
                  }}
                  size='md'
                ></Avatar>
              </TouchableOpacity>
            )}
            <View className='w-full'>
              <Text
                className='ml-4 text-xl'
                style={{ fontFamily: 'manrope_extra_bold', color: '#323232' }}
              >
                Bonjour {user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}
              </Text>

              {/* <Text className='ml-4 text-xl font-semibold text-slate-800'>
                Bonjour {user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}
              </Text> */}
              <Text
                className='ml-4 text-xs '
                style={{ fontFamily: 'manrope_regular', color: '#323232' }}
              >
                Découvre les nouvelles offres !
              </Text>
            </View>
          </View>
        )}
        <TextInput
          className='w-full bg-white rounded-md shadow-sm px-4 py-3 mt-2 mb-1'
          placeholder='🪴Rechercher une plante'
          value={search}
          onChangeText={(value) => setSearch(value)}
          placeholderTextColor='#AFAFAF'
          onFocus={navigateToMapSearchScreen}
          ref={inputRef}
        />
      </View>

      <ScrollView
        className='w-screen pt-0'
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        style={{ backgroundColor: '#A0C7AC' }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 10, y: 1 }}
          colors={['white', '#A0C7AC']}
          className=' items-center pb-3'
        >
          <View className='w-full mt-3'>
            <MaskedView
              style={{ height: 27, marginTop: 0, marginLeft: 12 }}
              maskElement={
                <Text className=' text-xl ' style={{ fontFamily: 'manrope_extra_bold' }}>
                  Top Planters autour de moi
                </Text>
              }
            >
              <LinearGradient
                colors={['#709045', '#6AB2DF', '#81BBA1']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0.33 }}
                style={{ flex: 1 }}
              />
            </MaskedView>
            {/* <Text className='pl-5 text-lg font-semibold tracking-widest uppercase'>Top Planters</Text> */}
            {/* <FlatList
            data={plantersData}
            renderItem={({ item }) => (
              <CardPlanter name={item.name} image={item.image} deals={item.deals} />
            )}
            keyExtractor={(item) => item.key}
            horizontal={true}
            contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
          /> */}
            <PlantersDisplay />
          </View>

          {/* <View className='h-[50px] w-full' />

        <View className='w-full'>
          <Text className='pl-5 text-xl '>🎉 Super deals / ventes privées !</Text>
          <FlatList
            data={dealData}
            renderItem={({ item }) => (
              <CardDeal entreprise={item.entreprise} ville={item.ville} photo={item.photo} />
            )}
            keyExtractor={(item) => item.key}
            horizontal={true}
            contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
          />
        </View> */}

          <View className='w-full'>
            <MaskedView
              style={{ height: 27, marginTop: 10, marginLeft: 12 }}
              maskElement={
                <Text className=' text-xl ' style={{ fontFamily: 'manrope_extra_bold' }}>
                  Catégories
                </Text>
              }
            >
              <LinearGradient
                colors={['#709045', '#6AB2DF', '#81BBA1']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0.33 }}
                style={{ flex: 1 }}
              />
            </MaskedView>
            <FlatList
              data={categorieData}
              renderItem={({ item }) => <CardCategorie name={item.name} image={item.image} />}
              keyExtractor={(item) => item.key}
              horizontal={false}
              contentContainerStyle={{ padding: 12 }}
            />
          </View>
          <MaskedView
            style={{ height: 27, marginTop: 10 }}
            maskElement={
              <Text className='ml-6 text-xl ' style={{ fontFamily: 'manrope_extra_bold' }}>
                Ta plante au quotiden
              </Text>
            }
          >
            <LinearGradient
              colors={['#709045', '#6AB2DF', '#81BBA1']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0.33 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <View className='w-full items-center mt-4 px-3'>
            <TouchableOpacity
              onPress={() => navigation.navigate('PlantCareScreen')}
              className='w-full h-[90px] bg-white flex flex-row items-center justify-evenly rounded-lg shadow'
            >
              <Image
                source={require('../../assets/icons/watercan-icon.png')}
                className='w-[50px] h-[50px]'
                contentFit='cover'
              />
              <View className='w-8/12 h-10/12 flex-row items-center'>
                <Text className='font-semibold text-slate-800 text-[15px] ml-3'>L'entretien</Text>
              </View>
              <ChevronRightIcon color='black' />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('PlantDiseaseScreen')}
              className='w-full h-[90px] bg-white flex flex-row items-center justify-evenly rounded-lg shadow my-5'
            >
              <Image
                source={require('../../assets/icons/question-icon.png')}
                className='w-[45px] h-[45px]'
                contentFit='cover'
              />
              <View className='w-8/12 h-10/12 flex-row items-center'>
                <Text className='font-semibold text-slate-800 text-[15px] ml-3'>
                  Que se passe-t-il ?
                </Text>
              </View>
              <ChevronRightIcon color='black' />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('PlantIdentityScreen')}
              className='w-full h-[90px] bg-white flex flex-row items-center justify-evenly rounded-lg shadow'
            >
              <Image
                source={require('../../assets/icons/plant-icon.png')}
                className='w-[45px] h-[45px]'
                contentFit='cover'
              />
              <View className='w-8/12 h-10/12 flex-row items-center'>
                <Text className='font-semibold text-slate-800 text-[15px] ml-3'>
                  Carte d'identité des plantes
                </Text>
              </View>
              <ChevronRightIcon color='black' />
            </TouchableOpacity>
          </View>

          {/* <View className='w-full h-40'>
          <Text className='pl-5 pb-4 text-lg w-full font-normal'>Publicité</Text>
          <Image
            source='https://i.ibb.co/FWY0jhd/02-01-decouvrir-histoire-de-marseille.jpg'
            contentFit='cover'
            transition={1000}
            className='w-full h-full'
          />
        </View> */}

          {/* <View className='w-full'>
          <Text className='pl-5 text-xl'>👀 À la une</Text>
          <FlatList
            data={plantesData}
            renderItem={({ item }) => (
              <CardProduct name={item.name} prix={item.prix} photo={item.photo} />
            )}
            keyExtractor={(item) => item.key}
            horizontal={true}
            contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
          />
        </View> */}

          <View className='h-[50px] w-full' />

          <View className='w-full'>
            <MaskedView
              style={{ height: 27, marginTop: 10 }}
              maskElement={
                <Text className='ml-6 text-xl ' style={{ fontFamily: 'manrope_extra_bold' }}>
                  Suggestions
                </Text>
              }
            >
              <LinearGradient
                colors={['#709045', '#6AB2DF', '#81BBA1']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0.33 }}
                style={{ flex: 1 }}
              />
            </MaskedView>
          </View>

          <SuggestionsDisplay />
          <View className='h-[200px] w-full' />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
    // </LinearGradient>
  )
}

export default HomeScreen
