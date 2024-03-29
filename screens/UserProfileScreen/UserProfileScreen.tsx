import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'expo-image'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient'
import { useToast } from 'native-base'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import UserOffersDisplay from '../../components/UserOffersDisplay/UserOffersDisplay'
import MaskedView from '@react-native-masked-view/masked-view'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { useFollowMutation, useUnfollowMutation } from '../../graphql/graphql'
import { userDataVar, updateUserData, UserData } from '../../variables/userData'
import { useReactiveVar } from '@apollo/client'

interface UserProfileScreenProps {}

const UserProfileScreen: React.FunctionComponent<UserProfileScreenProps> = (props) => {
  const userDataInDevice = useReactiveVar(userDataVar)
  const toast = useToast()
  const personalPlants: JSX.Element[] = []
  for (let i = 0; i < 5; i++) {
    let style = { color: 'black' }
    if (i < 3) {
      style = { color: 'orange' }
    }
    personalPlants.push(<FontAwesomeIcon name='star' size='20%' style={style} />)
  }

  // console.log('🔥props.route.params dans UserProfileScreen', props.route.params)
  const navigation = useNavigation()

  const { offerIds, avatar, createdAt, id, isPro, updatedAt, userBio, userName, city } =
    props.route.params.userData

  const [follow, { loading: followLoading }] = useFollowMutation({
    variables: { followedUserId: id },
  })

  const [unfollow, { loading: unfollowLoading }] = useUnfollowMutation({
    variables: { followedUserId: id },
  })

  const followUser = async () => {
    updateUserData('following', [...userDataInDevice.following, id])

    console.log('clic', process.env.API_URL)
    console.log('clic', id)
    toast.show({ title: `Vous suivez désormais ${userName}.` })
    const response = await follow({
      variables: {
        followedUserId: id,
      },
    })
    console.log(response)
    // on ajoute l'id dans la variable
  }
  const unfollowUser = async () => {
    updateUserData(
      'following',
      userDataInDevice.following.filter((item) => item !== id),
    )
    toast.show({ title: `Vous ne suivez plus ${userName}.` })
    console.log('clic', process.env.API_URL)
    console.log('clic', id)
    const response = await unfollow({
      variables: {
        followedUserId: id,
      },
    })
    console.log(response)
    // on supprime l'id dans la variable
  }
  return (
    <LinearGradient colors={['#C3EEEF', 'white', 'white']} className='h-screen w-screen flex-1'>
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        className='h-screen w-screen flex-1 justify-between '
      >
        <View className='w-full h-full px-0 flex justify-between '>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-[40px] h-[40px] justify-center items-center rounded-full border border-gray-200 bg-white opacity-50 absolute top-5 left-5 z-10 shadow'
          >
            <ChevronLeftIcon color={'black'} />
          </TouchableOpacity>
          <View className='flex items-center justify-center mb-10 mt-10  '>
            <View className='flex flex-row w-full justify-end'>
              {!userDataInDevice.following.includes(id) ? (
                <TouchableOpacity
                  onPress={() => followUser()}
                  className='flex flex-row items-center justify-start mx-2'
                >
                  <Text>Suivez {userName}</Text>
                  <SimpleLineIcon name='user-follow' size={30} color={'#A0C7AC'} style={{}} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => unfollowUser()}
                  className=' flex flex-row items-center justify-start mx-2'
                >
                  <Text>Vous suivez {userName}</Text>
                  <SimpleLineIcon name='user-unfollow' size={30} color={'#A0C7AC'} style={{}} />
                </TouchableOpacity>
              )}

              {/* <SimpleLineIcon name='user-following' size={30} color={'#A0C7AC'} style={{}} /> */}
            </View>
            <Image
              source={{
                uri: avatar,
              }}
              className='w-28 h-28 rounded-full'
            />
            <Text className='text-2xl font-bold mt-2 text-emerald-700	'>{userName}</Text>

            {/* {city && <Text className='text-gray-500'>{user.city}</Text>} */}
          </View>
          <View className='border-b border-gray-200 pb-4 mb-4 px-2'>
            <MaskedView
              style={{ height: 27, marginTop: 10 }}
              maskElement={
                <Text className=' text-xl ' style={{ fontFamily: 'manrope_extra_bold' }}>
                  À propos de moi
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

            <Text className='text-gray-600 mt-4'>{userBio}</Text>
          </View>
          {/* <MaskedView
              style={{ height: 27, marginTop: 10 }}
              maskElement={
                <Text className=' text-xl  px-2 ' style={{ fontFamily: 'manrope_extra_bold' }}>
                  Ma Note
                </Text>
              }
            >
              <LinearGradient
                colors={['#709045', '#6AB2DF', '#81BBA1']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0.33 }}
                style={{ flex: 1 }}
              />
            </MaskedView> */}

          {/* <View className='mb-4 items-center justify-center'>
              <Text className='text-xl'>{personalPlants}</Text>
              <Text className='text-yellow-500 text-3xl mt-2'>5/5</Text>
            </View> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className='mb-4 mt-1'>
              <MaskedView
                style={{ height: 27, marginTop: 10 }}
                maskElement={
                  <Text className='text-xl  px-2' style={{ fontFamily: 'manrope_extra_bold' }}>
                    Ventes en cours
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
              {/* {offerIds.map((listing, index) => (
                <View key={index} className='border border-gray-200 rounded-md p-4 mt-2'>
                  <Text className='text-lg font-bold'>{listing}</Text>
                  <Text className='text-gray-600 mt-1'>{listing}</Text>
                </View>
              ))} */}
              <UserOffersDisplay offerIds={offerIds} />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default UserProfileScreen
