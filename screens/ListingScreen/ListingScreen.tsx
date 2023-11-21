import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native'
import { Image } from 'expo-image'
import { Avatar, ScrollView, useToast } from 'native-base'
import { useReactiveVar } from '@apollo/client'
import { bookmarksVar } from '../../variables/bookmarks'
import AuthorDisplay from '../../components/AuthorDisplay/AuthorDisplay'
import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps'
import { LinearGradient } from 'expo-linear-gradient'

import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import Swiper from 'react-native-swiper'
import { ChatBubbleLeftIcon } from 'react-native-heroicons/solid'
import { useGetIsConversationExistingQuery } from '../../graphql/graphql'
import { useUser } from '@clerk/clerk-expo'

interface ListingScreenProps {}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

const ListingScreen: React.FunctionComponent<ListingScreenProps> = (props) => {
  const { isSignedIn, user } = useUser()

  const [like, setLike] = useState(props.route.params.like)
  const toast = useToast()
  const { width, height } = useWindowDimensions()
  const [likesCounter, setLikesCounter] = useState<number | null>(props.route.params.likesCounter)
  console.log('props.route.params', props.route.params)

  console.log('like', like)
  const {
    authorId,
    category,
    createdAt,
    description,
    health,
    id,
    isActive,
    maintenanceDifficultyLevel,
    pictures,
    plantHeight,
    plantName,
    environment,
    latitude,
    longitude,
    pot,
    price,
    updatedAt,
    city,
  } = props.route.params.listingData

  const { data: conversationData } = useGetIsConversationExistingQuery({
    variables: { offerId: id, userId1: authorId },
  })
  const navigation = useNavigation()
  const bookmarksArray = useReactiveVar(bookmarksVar)

  const addLike = () => {
    setLikesCounter(likesCounter + 1)
    setLike(true)
  }

  const dislike = () => {
    setLike(false)
    setLikesCounter(likesCounter - 1)
  }
  const scaleAnimation = useRef(new Animated.Value(1)).current

  const handleLike = async () => {
    // console.log(bookmarksArray);

    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()

    if (like && likesCounter) {
      bookmarksVar(bookmarksArray.filter((e) => e.id !== id))
      setLikesCounter(likesCounter - 1)
      setLike(false)
    }
    if (!like && likesCounter) {
      // console.log('!like && likesCounter');
      bookmarksVar([...bookmarksArray, props])
      setLikesCounter(likesCounter + 1)
      setLike(true)
    }
    if ((!like && !likesCounter) || (!like && likesCounter == 0)) {
      // console.log('!like && !likesCounter');

      bookmarksVar([...bookmarksArray, props])
      setLikesCounter(likesCounter + 1)
      setLike(true)
    }

    !like &&
      toast.show({
        title: "L'annonce a été ajoutée à vos favoris !",
      })
    const response = await bookmarkOffer({
      variables: {
        offerId: props.id,
      },
    })
  }

  const listingRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  const handleContactPress = () => {
    console.log('handleContactPress')
    console.log('conversationData', conversationData)

    navigation.navigate('ChatScreen', {
      existingConversationId: conversationData?.getIsConversationExisting,
      offerId: id,
      authorId,
    })
  }
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <View className='w-full h-[40%] relative'>
        <Swiper
          className='bg-green-100'
          style={styles.wrapper}
          showsButtons={false}
          dotColor={'white'}
          activeDotColor={'green'}
        >
          {pictures.map((imgUrl: string, index: number) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Gallery', { images: pictures, title: plantName })
                }
                style={styles.slide1}
                key={index}
              >
                <Image
                  className='w-full h-full'
                  source={imgUrl}
                  placeholder={blurhash}
                  contentFit='cover'
                />
              </TouchableOpacity>
            )
          })}

          {/* <View style={styles.slide1}>
            <Image
              className='w-full h-full'
              source={pictures[0]}
              contentFit='cover'
              transition={1000}
            />
          </View> */}
        </Swiper>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className='w-[50px] h-[50px] justify-center items-center rounded-full blur-lg bg-white opacity-70 absolute top-10 left-8'
        >
          <ChevronLeftIcon color={'black'} />
        </TouchableOpacity>
      </View>

      <View className='w-full h-[60%] bg-white flex-col relative'>
        <LinearGradient
          // start={{ x: 0.1, y: 0 }}
          // end={{ x: 0.9, y: 0 }}
          colors={['white', '#dcf0f7']}
          className='w-screen flex-col items-center'
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className='w-full flex flex-row  px-3 py-2 mt-2'>
              <AuthorDisplay userId={authorId} />

              <View className='w-6/12 justify-center items-end'>
                {isSignedIn && (
                  <TouchableOpacity
                    style={{ borderColor: '#6EB3D5' }}
                    className='w-[150px] flex-row justify-center items-center py-2 border rounded-2xl shadow-2xl'
                    onPress={() => handleContactPress()}
                  >
                    <ChatBubbleLeftIcon color={'#6EB3D5'} />
                    <Text
                      className=' ml-2'
                      style={{ fontFamily: 'manrope_bold', color: '#6EB3D5' }}
                    >
                      Contacter
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View className='h-[1px] w-[80%] bg-gray-300 my-5 relative ml-auto mr-auto' />
            <View className='flex flex-row  px-3'>
              <View className='w-8/12 flex-cols justify-between'>
                <Text className='text-2xl font-medium mb-4'>{plantName}</Text>
                <Text>
                  <Text className='text-sm font-semibold'>Localisation : </Text>
                  <Text>{city}</Text>
                </Text>
                <Text className='my-1'>
                  <Text className='text-sm font-semibold'>État : </Text>
                  <Text>{health}</Text>
                </Text>
                <Text className='my-1'>
                  <Text className='text-sm font-semibold'>Taille : </Text>
                  <Text>{plantHeight} cm</Text>
                </Text>
                {/* <Text>
                <Text className='text-sm font-semibold'> Âge : </Text>
                <Text>29 ans</Text>
              </Text> */}
              </View>
              <View className='w-4/12 flex-col justify-around items-end'>
                <TouchableOpacity
                  className='flex-row items-center'
                  onPress={() => {
                    like && likesCounter ? dislike() : addLike()
                    !like && likesCounter && setLikesCounter(likesCounter + 1)
                    props.route.params.handleLike()
                  }}
                >
                  {likesCounter != null && likesCounter > 0 && (
                    <Text className='mr-1'>{likesCounter}</Text>
                  )}
                  <HeartIcon color={like ? '#e74c3c' : '#d8d8d8'} size={20} />
                </TouchableOpacity>
                <Text className='text-2xl text-green-900'>{price} €</Text>
              </View>
            </View>
            {/* <View className='h-[1px] w-[80%] bg-gray-300 my-5 relative ml-auto mr-auto' /> */}
            {/* <View className='flex-row justify-between my-5  px-3'>
              <TouchableOpacity className='w-[150px] justify-center items-center py-2 bg-green-900 rounded-3xl shadow-2xl'>
                <Text className='text-white'>Acheter</Text>
              </TouchableOpacity>
              <TouchableOpacity className='w-[150px] justify-center items-center py-2 border border-green-900 rounded-3xl shadow-2xl'>
                <Text className='text-green-900'>Faire une offre</Text>
              </TouchableOpacity>
            </View> */}
            <View className='h-[1px] w-[80%] bg-gray-300 my-5 relative ml-auto mr-auto' />
            <View className='px-3'>
              <Text className='text-xl font-normal mb-4'>Description</Text>
              <Text style={{ textAlign: 'justify' }}>{description}</Text>
            </View>
            <View
              style={{
                width,
                height: height * 0.3,

                overflow: 'hidden',
                marginTop: 30,
              }}
            >
              <MapView style={{ flex: 1 }} provider={'google'} initialRegion={listingRegion}>
                <Marker coordinate={listingRegion} />
              </MapView>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  )
}

export default ListingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //   backgroundColor: 'green',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
})
