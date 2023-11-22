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
import MaskedView from '@react-native-masked-view/masked-view'

import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useGetUserConversationsQuery } from '../../graphql/graphql'
import { Avatar, Spinner, Divider } from 'native-base'
import { Image } from 'expo-image'
import GradientTitle from '../../components/GradientTitle/GradientTitle'
import { formatPrice } from '../../lib/formatPrice'
interface InboxScreenProps {}

const InboxScreen: React.FunctionComponent<InboxScreenProps> = (props) => {
  const [refreshing, setRefreshing] = useState(false)

  const { width, height } = useWindowDimensions()
  const navigation = useNavigation()
  const {
    data: userConversations,
    refetch: refetchUserConversations,
    loading,
  } = useGetUserConversationsQuery()
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
        alignItems: 'center',
        paddingVertical: 2,
        paddingHorizontal: 5,
        width: width * 0.93,
      }}
      className='items-center rounded-md '
      onPress={() =>
        navigation.navigate('ChatScreen', {
          authorId: item.participants[0].id,
          offerId: item.offer?.id,
          existingConversationId: item.id,
        })
      }
    >
      <View className='flex flex-row items-center '>
        <Avatar
          style={{ marginRight: 10 }}
          bg='warmGray.50'
          source={{
            uri: item.participants[0]?.avatar,
          }}
          width={12}
          height={12}
        >
          {/* <Avatar.Badge bg='green.500' size='23%' /> */}
        </Avatar>
        <View className=' justify-center'>
          <Text className='text-sm' style={{ fontFamily: 'manrope_regular', color: '#202123' }}>
            {item.participants[0].userName}
          </Text>
          <View className='flex justify-around'>
            <Text className='text-xs' style={{ fontFamily: 'manrope_regular', color: '#73859e' }}>
              {item.offer?.plantName}
            </Text>
            <Text className='text-xs' style={{ fontFamily: 'manrope_regular', color: '#6EB3D5' }}>
              {formatPrice(item.offer?.price.toString())}
            </Text>
          </View>

          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
      <Image
        style={{ width: width * 0.15, height: width * 0.16 }}
        className='rounded-md'
        source={item.offer.pictures[0]}
        // placeholder={blurhash}
        contentFit='cover'
      />
    </TouchableOpacity>
  )

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
        } pb-2 px-3`}
      >
        <View
          className={`w-full rounded-md flex flex-row  shadow py-2 px-3  bg-white ${
            Platform.OS === 'android' ? 'mt-0' : ''
          }`}
        >
          <View className='bg-white w-full flex bg-transparent'>
            <MaskedView
              style={{ height: 27 }}
              maskElement={
                <Text
                  className={`mx-auto text-xl text-center`}
                  style={{ fontFamily: 'manrope_extra_bold' }}
                >
                  Boîte de réception
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
        </View>
      </View>

      <ScrollView
        className='w-screen pt-0 '
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        style={{ backgroundColor: '#A0C7AC' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor='#87BC23'
            colors={['#87BC23', '#139DB8']}
          />
        }
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 10, y: 0.5 }}
          colors={['white', '#A0C7AC']}
          className=' items-center pb-3 h-screen px-3 py-3'
        >
          {loading ? (
            <Spinner />
          ) : (
            <FlatList
              data={userConversations?.UserConversations}
              className=''
              renderItem={renderMessage}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <Divider className='my-1' />}
            />
          )}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
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
