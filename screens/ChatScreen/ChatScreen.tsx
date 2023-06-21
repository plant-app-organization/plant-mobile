import React, { useState, useEffect } from 'react'
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
  Button,
  ScrollView,
  Touchable,
  useWindowDimensions,
  KeyboardAvoidingView,
} from 'react-native'
import moment from 'moment'
import localization from 'moment/locale/fr'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'native-base'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { ChevronLeftIcon, ArrowPathIcon } from 'react-native-heroicons/solid'
import Pusher from 'pusher-js/react-native'
import { useGetOffersDataByIdsQuery } from '../../graphql/graphql'
import { useGetUserDataByIdQuery } from '../../graphql/graphql'
import { useGetConversationMessagesQuery } from '../../graphql/graphql'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSendMessageMutation } from '../../graphql/graphql'

interface ChatScreenProps {
  senderId: string
  receiverId: string
}

const ChatScreen: React.FunctionComponent<ChatScreenProps> = (props) => {
  const [sendMessage] = useSendMessageMutation()

  const [message, setMessage] = useState('')
  const [userToken, setUserToken] = useState('')
  const [userName, setUserName] = useState<string>('')

  const { offerId, authorId, conversationId } = props.route.params
  console.log('offerId', offerId)
  const { data: userData } = useGetUserDataByIdQuery({
    variables: { userId: authorId },
  })
  const { data: offerData, refetch: refetchOfferData } = useGetOffersDataByIdsQuery({
    variables: { offerIds: [offerId] },
  })

  const { data: conversationData, refetch: refetchConversationData } =
    useGetConversationMessagesQuery({
      variables: { conversationId: null },
    })

  console.log('offerData in chatscreen', offerData)
  console.log('userdata in chatscreen', userData)
  console.log('conversatiOnData', conversationData)
  const { width, height } = useWindowDimensions()
  moment.updateLocale('fr', localization)

  // const displayToken = async () => {
  //   const { getToken } = useAuth()

  //   const token = await getToken()
  //   console.log('token in chatscreen ', token)
  //   setUserToken(token)
  // }
  // displayToken()
  // //Pusher chat
  // useEffect(() => {
  //   const channelId = `private-message-${senderId}-${receiverId}`

  //   const pusher = new Pusher('your-app-key', {
  //     cluster: 'your-cluster',
  //     authEndpoint: 'http://yourserver.com/pusher/auth',
  //     auth: {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     },
  //   })

  //   const channel = pusher.subscribe(channelId)

  //   channel.bind('new-message', function (data) {
  //     alert(JSON.stringify(data))
  //   })

  //   // Clean up function
  //   return () => {
  //     channel.unbind('new-message')
  //     pusher.unsubscribe(channelId)
  //   }
  // }, [senderId, receiverId])

  const fadeIn = new Animated.Value(0)
  const { isSignedIn, user } = useUser()

  const navigation = useNavigation()

  // console.log(offerData?.OffersListByIds[0].pictures[0])

  const onSendMessagePress = async () => {
    const response = await sendMessage({
      variables: {
        newMessageInput: {
          offerId,
          text: message,
        },
      },
    })
    console.log('response', response)
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#CFF5FF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <LinearGradient
        colors={['#CFF5FF', 'white']}
        className='w-full'
        style={{ height: height * 0.15 }}
      >
        <View className='flex flex-row items-center justify-between px-3'>
          <View className='flex flex-row items-center'>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className='w-[40px] h-[40px] justify-center items-center rounded-full border border-gray-200 bg-white opacity-50 shadow ml-4'
            >
              <ChevronLeftIcon color={'black'} />
            </TouchableOpacity>
            <Text className='ml-4 text-xl' style={{ fontFamily: 'manrope_extra_bold' }}>
              {userData?.userDataById?.userName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => console.log('refresh')}
            className='w-[40px] h-[40px] justify-center items-center rounded-full border border-gray-200 bg-white opacity-50 shadow ml-4'
          >
            <ArrowPathIcon color={'black'} />
          </TouchableOpacity>
          {/* <Avatar
            style={{}}
            bg='amber.500'
            source={{
              uri: user?.profileImageUrl,
            }}
            size='md'
          >
            NB
            <Avatar.Badge bg='green.500' size='23%' />
          </Avatar> */}
        </View>
        <TouchableOpacity
          className='flex flex-row items-start p-4 justify-end'
          style={{ height: height * 0.1 }}
        >
          <Image
            style={{ width: 90, height: 65, borderRadius: 12 }}
            source={offerData?.OffersListByIds[0].pictures[0]}
            // placeholder={blurhash}
            contentFit='cover'
          />

          <View>
            <Text className='ml-4 text-md' style={{ fontFamily: 'manrope', color: 'grey' }}>
              {offerData?.OffersListByIds[0].city}
            </Text>
            <Text className='ml-4 text-xl' style={{ fontFamily: 'manrope_extra_bold' }}>
              {offerData?.OffersListByIds[0].plantName}
            </Text>
            <Text className='ml-4 text-md' style={{ fontFamily: 'manrope' }}>
              {offerData?.OffersListByIds[0].price} €
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          className='w-full px-5'
          style={{ backgroundColor: 'white', height: height * 0.65 }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <View style={styles.chatContainer}>
            {/* reprendre en fonction de l'ID du user */}
            {!conversationData ? (
              <Text>Débutez une conversation avec {userData?.userDataById?.userName} </Text>
            ) : (
              conversationData?.MessagesList.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.messageContainer,
                    item.senderId === userData?.userDataById?.id
                      ? styles.messageContainerLeft
                      : styles.messageContainerRight,
                  ]}
                >
                  {item.senderId === userData?.userDataById?.id && (
                    <Avatar
                      alignSelf='left'
                      bg='amber.500'
                      size='sm'
                      source={{
                        uri: userData?.userDataById?.avatar,
                      }}
                    >
                      JL
                    </Avatar>
                  )}
                  <Animated.Text style={[styles.message]}>{item.text}</Animated.Text>
                  <Animated.Text style={[styles.date]}>
                    {moment().diff(item.createdAt, 'days') <= 2
                      ? moment(item.createdAt).fromNow()
                      : moment(item.createdAt).format('LL')}
                  </Animated.Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            height: height * 0.15,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder='Entrez votre message ici'
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity style={styles.button} onPress={onSendMessagePress}>
            <Text style={styles.buttonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    paddingHorizontal: 1,
  },
  messageContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 12,
  },
  message: {
    fontSize: 17,
    color: '#6b6b6b',
    fontFamily: 'manrope_bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    fontSize: 16,
    shadowColor: '#3FA96A',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainerLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#d3eada',
    alignItems: 'flex-start',
  },
  messageContainerRight: {
    alignSelf: 'flex-end',

    alignItems: 'flex-end',
  },
  date: {
    fontSize: 11,
    opacity: 0.7,
  },
})

export default ChatScreen
