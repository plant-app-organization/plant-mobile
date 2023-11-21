import React, { useCallback, useState } from 'react'
import {
  Platform,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  useWindowDimensions,
  Button,
  Pressable,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useGetUserConversationsQuery } from '../../graphql/graphql'
import { Avatar } from 'native-base'
import { ArrowPathIcon } from 'react-native-heroicons/solid'
import { Image } from 'expo-image'
import GradientTitle from '../../components/GradientTitle/GradientTitle'

interface InboxScreenProps {}

const InboxScreen: React.FunctionComponent<InboxScreenProps> = (props) => {
  const [refreshing, setRefreshing] = useState(false)

  const { width, height } = useWindowDimensions()
  const navigation = useNavigation()
  const { data: userConversations, refetch: refetchUserConversations } =
    useGetUserConversationsQuery()
  const handleRefresh = () => {
    refetchUserConversations()
  }
  console.log('userConversations', userConversations)

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      refetchUserConversations()
      setRefreshing(false)
    })
  }, [])
  const renderMessage = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'row',

        justifyContent: 'space-between',
        paddingVertical: 2,

        paddingHorizontal: 5,
      }}
      className='mx-auto items-center my-2 rounded-md shadow shadow-md'
      onPress={() =>
        navigation.navigate('ChatScreen', {
          authorId: item.participants[0].id,
          offerId: item.offer?.id,
          existingConversationId: item.id,
        })
      }
    >
      {/* <Image source={item.participants[0]?.avatar} style={styles.avatar} /> */}
      <Avatar
        style={{}}
        bg='warmGray.50'
        source={{
          uri: item.participants[0]?.avatar,
        }}
        width={12}
        height={12}
      >
        {/* <Avatar.Badge bg='green.500' size='23%' /> */}
      </Avatar>
      <View style={{ width: '60%' }}>
        <Text className='text-lg' style={{ fontFamily: 'manrope_bold', color: '#202123' }}>
          {item.participants[0].userName}
        </Text>
        <View className='flex justify-around'>
          <Text className='text-md' style={{ fontFamily: 'manrope_regular', color: '#73859e' }}>
            {item.offer?.plantName}
          </Text>
          <Text className='text-md' style={{ fontFamily: 'manrope_bold', color: '#6EB3D5' }}>
            {item.offer?.price}€
          </Text>
        </View>

        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Image
        style={{ width: 90, height: 65 }}
        className='rounded-md'
        source={item.offer.pictures[0]}
        // placeholder={blurhash}
        contentFit='cover'
      />
    </TouchableOpacity>
  )

  return (
    <LinearGradient
      // start={{ x: 0.1, y: 0 }}
      // end={{ x: 0.9, y: 0 }}
      colors={['#C0FFE7', 'white']}
      className=' items-center pb-3'
    >
      <SafeAreaView
        style={{
          // backgroundColor: 'pink',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
        className='items-center'
      >
        <View
          className={`w-[95%] rounded-lg  shadow py-2 px-3  bg-white ${
            Platform.OS === 'android' ? 'mt-4 ' : ''
          }`}
        >
          <View className='flex flex-row justify-center items-center w-full'>
            <GradientTitle title='Boîte de réception' align='left' />
          </View>
        </View>

        <FlatList
          data={userConversations?.UserConversations}
          className='pt-2 flex-1 mt-2 px-3'
          renderItem={renderMessage}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor='#87BC23'
              colors={['#87BC23', '#139DB8']}
            />
          }
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageContent: {
    marginLeft: 10,
  },

  subject: {
    fontSize: 16,
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
})

export default InboxScreen
