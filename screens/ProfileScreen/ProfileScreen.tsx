import React, { useState, useRef, useEffect } from 'react'
import { Image } from 'expo-image'

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient'
import { Avatar, Modal, Badge } from 'native-base'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import { useReactiveVar } from '@apollo/client'
import { bookmarksVar } from '../../variables/bookmarks'
import { useGetMyUserDataQuery } from '../../graphql/graphql'
import GradientTitle from '../../components/GradientTitle/GradientTitle'
import { userDataVar } from '../../variables/userData'
import { unregisterIndieDevice } from 'native-notify'

interface ProfileScreenProps {
  progress: number
}

const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = (props) => {
  const userDataInDevice = useReactiveVar(userDataVar)

  const userBookmarks = useReactiveVar(bookmarksVar)
  const { data: userData, loading, error } = useGetMyUserDataQuery()

  const { isSignedIn, user } = useUser()
  if (!isSignedIn) {
    props.navigation.replace('SigninScreen')
  }

  const { getToken, signOut } = useAuth()
  const [sessionToken, setSessionToken] = React.useState('')
  const [progress, setProgress] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [isOpen, setIsOpen] = useState<boolean | void | undefined>(false)
  const zoomValue = useRef(new Animated.Value(0)).current
  const [nameEvo, setNameIndex] = useState(0)
  const navigation = useNavigation()
  const onSignOutPress = async () => {
    try {
      await SecureStore.deleteItemAsync('__clerk_client_jwt')
      unregisterIndieDevice(userDataInDevice.email, 15168, '2NQv5UM3ppjj8VIDgMfgb4')

      await signOut()
    } catch (err: any) {
      console.log('Error:> ' + err?.status || '')
      console.log('Error:> ' + err?.errors ? JSON.stringify(err.errors) : err)
    }
  }
  useEffect(() => {
    const scheduler = setInterval(async () => {
      const token = await getToken()
      setSessionToken(token as string)
    }, 1000)

    return () => clearInterval(scheduler)
  }, [])
  useEffect(() => {
    Animated.timing(zoomValue, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start()
  }, [])

  useEffect(() => {
    if (imageIndex > 0) {
      setIsOpen(true)
    }
  }, [imageIndex])

  const handleButtonClick = () => {
    if (progress < 25) {
      setProgress(progress + 5)
      setImageIndex(0)
      setNameIndex(0)
    } else if (progress < 50) {
      setProgress(progress + 5)
      setImageIndex(1)
      setNameIndex(1)
    } else if (progress < 75) {
      setProgress(progress + 5)
      setImageIndex(2)
      setNameIndex(2)
    } else if (progress <= 95) {
      setProgress(progress + 5)
      setImageIndex(3)
      setNameIndex(3)
    } else {
      setProgress(progress)
      setImageIndex(3)
      setNameIndex(3)
    }
  }

  const personalPlants: JSX.Element[] = []
  for (let i = 0; i < 5; i++) {
    let style = { color: 'black' }
    if (i < 3) {
      style = { color: 'orange' }
    }
    personalPlants.push(<FontAwesomeIcon name='star' style={style} />)
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#A0C7AC',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <LinearGradient
        // start={{ x: 0.1, y: 0 }}
        // end={{ x: 0.9, y: 0 }}
        colors={['#A0C7AC', 'white']}
        className='w-full h-[200px]'
      >
        <View className=' flex-row border-gray-200 px-5 pt-8'>
          <View className='w-full flex-col items-center justify-start'>
            <Avatar
              bg='warmGray.50'
              source={{
                uri: userDataInDevice.avatar,
              }}
              size='xl'
            ></Avatar>
            <GradientTitle
              title={user?.username?.charAt().toUpperCase() + user?.username?.slice(1)}
              align='left'
            />
          </View>
        </View>
      </LinearGradient>
      <ScrollView className='w-full h-full px-3 flex bg-white pt-6'>
        <TouchableOpacity
          className='w-full flex-row items-center justify-between py-3 border-b '
          style={{ borderBottomColor: '#f7f7f7' }}
          onPress={() => navigation.navigate('EditProfileScreen')}
        >
          <FontAwesomeIcon name='gear' size={20} color={'#A0C7AC'} />
          <Text
            className='ml-5 mr-auto  text-lg'
            style={{ fontFamily: 'manrope_regular', color: '#73859e' }}
          >
            Modifier mon profil
          </Text>
          <FontAwesomeIcon name='angle-right' size={26} color={'#A0C7AC'} />
        </TouchableOpacity>
        <TouchableOpacity
          className='w-full flex-row items-center justify-between py-3 border-b'
          style={{ borderBottomColor: '#f7f7f7' }}
          onPress={() => navigation.navigate('Bookmarks')}
        >
          <FontAwesomeIcon name='heart' size={20} color={'#A0C7AC'} />
          <Text
            className='ml-4 mr-auto text-lg'
            style={{ fontFamily: 'manrope_regular', color: '#73859e' }}
          >
            Mes favoris
          </Text>
          <Badge
            colorScheme='success'
            variant='subtle'
            rounded='full'
            mt={-4}
            mr={0}
            pr={1}
            pl={1}
            zIndex={1}
            alignSelf='flex-start'
            _text={{
              fontSize: 10,
            }}
          >
            {userBookmarks?.length}
          </Badge>
          <FontAwesomeIcon name='angle-right' size={26} color={'#A0C7AC'} />
        </TouchableOpacity>

        <TouchableOpacity
          className='w-full flex-row items-center justify-between py-3 border-b'
          style={{ borderBottomColor: '#f7f7f7' }}
        >
          <FontAwesomeIcon className='' name='euro' size={20} color={'#A0C7AC'} />

          <Text
            className='ml-6 mr-auto text-lg'
            style={{ fontFamily: 'manrope_regular', color: '#73859e' }}
          >
            Mes annonces
          </Text>
          <Badge
            colorScheme='success'
            variant='subtle'
            rounded='full'
            mt={-4}
            mr={0}
            pr={1}
            pl={1}
            zIndex={1}
            alignSelf='flex-start'
            _text={{
              fontSize: 10,
            }}
          >
            1
          </Badge>
          <FontAwesomeIcon name='angle-right' size={26} color={'#A0C7AC'} />
        </TouchableOpacity>
        <TouchableOpacity
          className='w-full flex-row items-center justify-between py-3 border-b'
          style={{ borderBottomColor: '#f7f7f7' }}
        >
          <FontAwesomeIcon className='' name='question-circle-o' size={20} color={'#A0C7AC'} />

          <Text
            className='ml-5 mr-auto text-lg'
            style={{ fontFamily: 'manrope_regular', color: '#73859e' }}
          >
            Aide
          </Text>
          <FontAwesomeIcon name='angle-right' size={26} color={'#A0C7AC'} />
        </TouchableOpacity>
        <TouchableOpacity
          className='w-full flex-row items-center justify-between py-3 border-b'
          style={{ borderBottomColor: '#f7f7f7' }}
        >
          <FontAwesomeIcon className='' name='share-alt' size={20} color={'#A0C7AC'} />

          <Text
            className='ml-5 mr-auto text-lg'
            style={{ fontFamily: 'manrope_regular', color: '#73859e' }}
          >
            Partager l'application
          </Text>
          <FontAwesomeIcon name='angle-right' size={26} color={'#A0C7AC'} />
        </TouchableOpacity>

        {/* <TouchableOpacity className='w-full flex-row items-center justify-between py-5 border-b border-gray-200'>
          <FontAwesomeIcon className=' w-1/12 text-blue-300	' name='shopping-cart' size={20} />
          <View className='w-10/12'>
            <Text className='text-lg' style={{ fontFamily: 'manrope_bold', color: '#73859e' }}>
              Mes achats
            </Text>
          </View>
          <FontAwesomeIcon name='angle-right' size={20} />
        </TouchableOpacity>

        <TouchableOpacity className='w-full flex-row items-center justify-between py-5 border-b border-gray-200'>
          <FontAwesomeIcon className=' w-1/12 text-neutral-400' name='commenting' size={20} />
          <View className='w-10/12'>
            <Text className='text-lg' style={{ fontFamily: 'manrope_bold', color: '#73859e' }}>
              Mes avis
            </Text>
          </View>
          <FontAwesomeIcon name='angle-right' size={20} />
        </TouchableOpacity> */}

        <TouchableOpacity
          className='flex-row items-center justify-between py-2'
          onPress={onSignOutPress}
        >
          <MaterialIcon name='logout' size={20} color={'red'} />
          <Text
            className='ml-4 mr-auto text-lg'
            style={{ fontFamily: 'manrope_regular', color: '#73859e' }}
          >
            Déconnexion
          </Text>
          <FontAwesomeIcon name='angle-right' size={26} color={'#A0C7AC'} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
