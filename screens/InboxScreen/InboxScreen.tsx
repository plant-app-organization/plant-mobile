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
        borderColor: 'grey',
        borderWidth: 1,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderRadius: 8,
        padding: 8,
      }}
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
        bg='amber.500'
        source={{
          uri: item.participants[0]?.avatar,
        }}
        size='lg'
      >
        {/* <Avatar.Badge bg='green.500' size='23%' /> */}
      </Avatar>
      <View style={{ width: '50%' }}>
        <Text className='text-lg' style={{ fontFamily: 'manrope_extra_bold', color: '#202123' }}>
          {item.participants[0].userName}
        </Text>
        <View className='flex justify-around'>
          <Text className='text-lg' style={{ fontFamily: 'manrope', color: '#4EAE74' }}>
            {item.offer?.plantName}
          </Text>
          <Text className='text-lg' style={{ fontFamily: 'manrope_bold', color: '#6EB3D5' }}>
            {item.offer?.price}€
          </Text>
        </View>

        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Image
        style={{ width: 90, height: 65, borderRadius: 12 }}
        source={item.offer.pictures[0]}
        // placeholder={blurhash}
        contentFit='cover'
      />
    </TouchableOpacity>
  )

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
        className='h-[100px]'
      >
        <View className=' h-full flex-row items-center justify-between'>
          <Text className='text-m	 mr-4 text-xl' style={{ fontFamily: 'manrope_bold' }}>
            Boîte de réception
          </Text>

          <TouchableOpacity
            onPress={handleRefresh}
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: 'gray',
              backgroundColor: 'white',
              opacity: 0.5,
              marginLeft: 4,
            }}
          >
            <ArrowPathIcon color={'black'} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <FlatList
        data={userConversations?.UserConversations}
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
