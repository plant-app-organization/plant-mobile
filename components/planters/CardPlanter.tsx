import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { Avatar } from 'native-base'
import { ChevronRightIcon } from 'react-native-heroicons/solid'
import { Box, Skeleton, VStack, Center, HStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { truncateString } from '../../lib/truncateString'
interface CardPlanterProps {
  id: string
  name: string
  deals: number
  avatar: string
  avatarThumbnail: string
  loading: boolean
  userBio: string
}

const CardPlanter: React.FunctionComponent<CardPlanterProps> = (props) => {
  const navigation = useNavigation()
  console.log('props dans CardPlanter.tsx', props)
  return (
    <TouchableOpacity
      className='mr-4 bg-white py-3 px-2 shadow-sm rounded-md w-22'
      onPress={() =>
        navigation.navigate('UserProfile', {
          userData: {
            avatar: props.avatar,
            createdAt: '',
            id: props.id,
            isPro: props.isPro,
            userBio: props.userBio,
            userName: props.name,
            offerIds: props.offers,
          },
        })
      }
    >
      <Avatar
        alignSelf='center'
        bg='warmGray.50'
        width={12}
        height={12}
        source={{
          uri: props.avatarThumbnail,
        }}
      ></Avatar>
      <Text
        className=' mb-0 text-center'
        style={{ fontSize: 13, fontFamily: 'manrope_bold', color: '#323232' }}
      >
        {truncateString(props.name, 8)}
      </Text>
      <Text
        className=' mb-0 text-center'
        style={{ fontSize: 11, fontFamily: 'manrope', color: '#73859e' }}
      >
        {props.deals} plantdeals
      </Text>
    </TouchableOpacity>
  )
}

export default CardPlanter
