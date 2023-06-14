import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  FlatList,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import { Image } from 'expo-image'

import { LinearGradient } from 'expo-linear-gradient'
import CardProduct from '../../components/product/CardProduct'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

interface GalleryScreenProps {
  images: string[]
  title: string
}

const GalleryScreen: React.FunctionComponent<GalleryScreenProps> = (props) => {
  const navigation = useNavigation()
  const { width, height } = useWindowDimensions()
  const { images, title } = props.route.params
  console.log('props galleryscreen', props.route.params)
  // console.log('userBookmarks in Bookmarksscreen', userBookmarks);

  const renderItem = useCallback(({ item }) => <CardProduct {...item} isBookmarked={true} />, [])
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

  return (
    <ScrollView className='w-screen'>
      <LinearGradient
        // Background Linear Gradient
        colors={['#f2fff3', '#bee6c2', '#f2fff3', '#f2fff3', '#f2fff3', '#bee6c2']}
        style={styles.background}
      >
        <SafeAreaView
          style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        >
          <View className='flex-row pl-6 pr-6 pb-2 items-center justify-between w-full'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon name='angle-left' size={24} />
            </TouchableOpacity>
            <Text className='text-black text-center font-antipasto text-lg'>{title}</Text>
          </View>

          <View className='items-start justify-start pt-0'>
            {images.map((imageUrl, i) => {
              return (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 900,
                    width: width,
                  }}
                >
                  <Image
                    style={styles.image}
                    source={imageUrl}
                    placeholder={blurhash}
                    contentFit='contain'
                    transition={1000}
                  />
                </View>
              )
            })}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  image: {
    flex: 1,
    width: '95%',
    backgroundColor: '#0553',
    margin: 10,
  },
})

export default GalleryScreen
