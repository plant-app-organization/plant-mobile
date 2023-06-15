import React, { useState } from 'react'
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
  Dimensions,
  useWindowDimensions,
} from 'react-native'
import CardPlanter from '../planters/CardPlanter'
import { useGetTopPlantersQuery } from '../../graphql/graphql'
import { Box, Skeleton, VStack, Center, HStack } from 'native-base'
import PlanterSkeleton from '../PlanterSkeleton/PlanterSkeleton'
import { Image } from 'expo-image'

export default function GalleryItem({ imageUrl }) {
  const [imageHeight, setImageHeight] = useState(0)
  const { width } = Dimensions.get('window')
  console.log('image in item', imageUrl)
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

  const handleImageLoad = (event) => {
    // Get image dimensions
    const { width: imgWidth, height: imgHeight } = event.nativeEvent.source
    console.log('image url', imageUrl, 'width', imgWidth, 'height', imgHeight)
    // Calculate image height according to the screen width
    const calculatedHeight = imgHeight * (width / imgWidth)
    setImageHeight(calculatedHeight)
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 500,
      }}
    >
      <Image
        style={{ width: width, height: 500, margin: 5 }}
        source={imageUrl}
        placeholder={blurhash}
        contentFit='contain'
        transition={1000}
        onLoad={handleImageLoad}
      />
    </View>
  )
}
