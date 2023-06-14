import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'expo-image'

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient'
import { Avatar, Modal, Badge } from 'native-base'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import ConfettiCannon from 'react-native-confetti-cannon'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import PokemonModal from '../../components/modal/PokemonModal'
import { useReactiveVar } from '@apollo/client'
import { bookmarksVar } from '../../variables/bookmarks'

interface ProfileScreenProps {
  progress: number
}

const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = (props) => {
  const userBookmarks = useReactiveVar(bookmarksVar)

  const { isSignedIn, user } = useUser()
  if (!isSignedIn) {
    props.navigation.replace('SigninScreen')
  }

  const name = ['Joliflor', 'Floraroma', 'Beautiflore', 'Melodiflore']
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

  const handleModalClose = () => {
    setIsOpen(false)
  }

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
        <View className=' flex-row border-gray-200 px-5'>
          <View className='w-6/12 h-full flex-row items-center'>
            <Avatar
              bg='amber.500'
              source={{
                uri: user?.profileImageUrl,
              }}
              size='lg'
            >
              NB
              <Avatar.Badge bg='green.500' size='23%' />
            </Avatar>

            <View className='ml-4'>
              <Text className='ml-4 text-xl' style={{ fontFamily: 'manrope_extra_bold' }}>
                {user?.username?.charAt().toUpperCase() + user?.username?.slice(1)}
              </Text>
              {/* <Text>{personalPlants}</Text> */}
            </View>
          </View>

          <TouchableOpacity className='w-6/12 h-full flex-row items-center justify-end'>
            <Text className='text-m	 mr-4' style={{ fontFamily: 'manrope_bold', color: '#323232' }}>
              Modifier mon profil
            </Text>
            <FontAwesomeIcon name='angle-right' size={20} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <ScrollView className='w-full h-full px-5 flex bg-white 	'>
        <TouchableOpacity
          className='w-full flex-row items-center justify-between py-5 border-b border-gray-200'
          onPress={() => navigation.navigate('Bookmarks')}
        >
          <FontAwesomeIcon className=' w-1/12 text-red-300 ' name='heart' size={20} />
          <View className='w-10/12 flex flex-row'>
            <Text className='text-lg' style={{ fontFamily: 'manrope_bold', color: '#323232' }}>
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
          </View>
          <FontAwesomeIcon name='angle-right' size={20} />
        </TouchableOpacity>

        <TouchableOpacity className='w-full flex-row items-center justify-between py-5 border-b border-gray-200'>
          <FontAwesomeIcon className=' w-1/12 text-yellow-300' name='euro' size={20} />
          <View className='w-10/12'>
            <Text className='text-lg' style={{ fontFamily: 'manrope_bold', color: '#323232' }}>
              Mes ventes
            </Text>
          </View>
          <FontAwesomeIcon name='angle-right' size={20} />
        </TouchableOpacity>

        <TouchableOpacity className='w-full flex-row items-center justify-between py-5 border-b border-gray-200'>
          <FontAwesomeIcon className=' w-1/12 text-blue-300	' name='shopping-cart' size={20} />
          <View className='w-10/12'>
            <Text className='text-lg' style={{ fontFamily: 'manrope_bold', color: '#323232' }}>
              Mes achats
            </Text>
          </View>
          <FontAwesomeIcon name='angle-right' size={20} />
        </TouchableOpacity>

        <TouchableOpacity className='w-full flex-row items-center justify-between py-5 border-b border-gray-200'>
          <FontAwesomeIcon className=' w-1/12 text-neutral-400' name='commenting' size={20} />
          <View className='w-10/12'>
            <Text className='text-lg' style={{ fontFamily: 'manrope_bold', color: '#323232' }}>
              Mes avis
            </Text>
          </View>
          <FontAwesomeIcon name='angle-right' size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          className='w-full flex-row items-center justify-center  py-9'
          onPress={onSignOutPress}
        >
          <View className='w-10/12 items-center'>
            <FontAwesomeIcon className=' w-1/12 text-pink-300 self-center	' name='user' size={20} />

            <Text className='text-lg' style={{ fontFamily: 'manrope_bold', color: '#323232' }}>
              Me déconnecter
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
