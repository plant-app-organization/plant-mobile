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
// import CardProduct from '../../components/product/CardProduct'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import GalleryItem from '../../components/GalleryItem/GalleryItem'
interface GalleryScreenProps {
  images: string[]
  title: string
}

const GalleryScreen: React.FunctionComponent<GalleryScreenProps> = (props) => {
  const navigation = useNavigation()
  const { width, height } = useWindowDimensions()
  const { images, title } = props.route.params
  //   console.log('props galleryscreen', props.route.params)
  // console.log('userBookmarks in Bookmarksscreen', userBookmarks);

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
      }}
    >
      <View className='flex-row pl-6 pr-6 pb-2 items-center justify-between w-full'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon name='angle-left' size={30} />
        </TouchableOpacity>
        <Text className='text-lg' style={{ fontFamily: 'manrope_bold', color: '#323232' }}>
          {title}
        </Text>
      </View>
      <ScrollView
        className=''
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {images.map((imageUrl, i) => {
          //   console.log('IMAGEURL in  map', imageUrl)
          return <GalleryItem key={i} imageUrl={imageUrl} />
        })}
      </ScrollView>
    </SafeAreaView>
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
})

export default GalleryScreen
