import React, { useState, useCallback, useEffect, useRef } from 'react'
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
  Pressable,
  Keyboard,
  Button,
  RefreshControl,
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
import { Avatar, Spinner } from 'native-base'
import { useAuth, useUser, isSignedIn } from '@clerk/clerk-expo'
import { ChevronLeftIcon, ArrowPathIcon } from 'react-native-heroicons/solid'
import Pusher from 'pusher-js/react-native'
import { useGetOffersDataByIdsQuery } from '../../graphql/graphql'
import { useGetUserDataByIdQuery } from '../../graphql/graphql'
import { useGetConversationMessagesLazyQuery } from '../../graphql/graphql'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSendMessageMutation, useOnMessageAddedSubscription } from '../../graphql/graphql'

interface ChatScreenProps {
  senderId: string
  receiverId: string
}

const ChatScreen: React.FunctionComponent<ChatScreenProps> = (props) => {
  const { isSignedIn, user } = useUser()
  const [sendMessage, { loading: sendMessageLoading }] = useSendMessageMutation()
  const [refreshing, setRefreshing] = useState(false)
  const [message, setMessage] = useState('')
  const [userToken, setUserToken] = useState('')
  const [userName, setUserName] = useState<string>('')
  const { offerId, authorId, existingConversationId } = props.route.params
  // console.log('props.route.params', props.route.params)
  const [conversationId, setConversationId] = useState<string>(existingConversationId)
  const scrollViewRef = useRef()
  useEffect(() => {
    console.log('sendMessageLoading', sendMessageLoading)
  }, [sendMessageLoading])
  // console.log('offerId', offerId)
  const { data: userData } = useGetUserDataByIdQuery({
    variables: { userId: authorId },
  })

  const { data: offerData, refetch: refetchOfferData } = useGetOffersDataByIdsQuery({
    variables: { offerIds: [offerId] },
  })

  // const { data: conversationData, refetch: refetchConversationData } =
  //   useGetIsConversationExistingQuery({
  //     variables: { offerId, userId1: authorId },
  //   })
  const [getConversationMessages, { data: conversationData, refetch: refetchConversationData }] =
    useGetConversationMessagesLazyQuery({
      variables: { conversationId },
    })

  useEffect(() => {
    if (isSignedIn) {
      // Lancer la requête de bookmarks seulement si l'utilisateur est connecté
      console.log('conversationId In Chat Screen', conversationId)
      getConversationMessages()
    }
  }, [isSignedIn, getConversationMessages])

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  // console.log('conversationData', conversationData)
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      refetchConversationData()
      setRefreshing(false)
    })
  }, [])
  // console.log('offerData in chatscreen', offerData)
  // console.log('userdata in chatscreen', userData)
  // console.log('authorId', authorId)
  // console.log('--------conversatiOnData', conversationData)
  // console.log('--------ConversationId in ChatScreenn', conversationId)
  const { width, height } = useWindowDimensions()
  moment.updateLocale('fr', localization)

  const fadeIn = new Animated.Value(0)

  const navigation = useNavigation()
  // console.log('conversationid', conversationId)
  // console.log(offerData?.OffersListByIds[0].pictures[0])
  //
  const onSendMessagePress = async () => {
    Keyboard.dismiss()
    const response = await sendMessage({
      variables: {
        newMessageInput: {
          existingConversationId: existingConversationId,
          offerId,
          text: message,
        },
      },
    })
    // console.log('PPPPPPPPPPP     response', response)
    if (response.data?.sendMessage.result === true) {
      if (response.data?.sendMessage.conversationId !== conversationId) {
        setConversationId(response.data?.sendMessage.conversationId)
      }
      setMessage('')
    }
  }

  // Variables for the subscription
  const subscriptionVariables = {
    conversationId,
  }

  // Start the subscription
  const { data: newMessageData, loading } = useOnMessageAddedSubscription({
    variables: subscriptionVariables,
  })
  console.log('newMessageData', newMessageData)

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true })
  }, [conversationData]) // Assuming 'messages' is your state or prop that updates with new messages

  // Handle new messages
  useEffect(() => {
    // console.log('⛵️⛵️⛵️⛵️⛵️!!!!! nouveau message newMessageData', newMessageData)
    if (newMessageData) {
      // The query for conversation messages will be refetched when a new message is received
      refetchConversationData()
    }
  }, [newMessageData])

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
        style={{ height: Platform.OS == 'ios' ? height * 0.15 : height * 0.25 }}
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
      <KeyboardAwareScrollView
        // style={{ flex: 1 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        ref={scrollViewRef}
        className='w-full px-5'
        style={{ backgroundColor: 'white', height: 0.8 * height }}
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor='#87BC23'
            colors={['#87BC23', '#139DB8']}
          />
        }
      >
        <View style={styles.chatContainer}>
          {/* reprendre en fonction de l'ID du user */}
          {conversationData?.MessagesList.map((item) => (
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
          ))}
        </View>

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

          {!sendMessageLoading ? (
            <TouchableOpacity style={styles.button} onPress={onSendMessagePress}>
              <Text style={styles.buttonText}>Envoyer</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonLoading} onPress={onSendMessagePress}>
              <Spinner color='white' />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    paddingHorizontal: 1,
    paddingTop: 40,
  },
  messageContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
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

  buttonLoading: {
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    opacity: 0.8,
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
    maxWidth: '75%',
  },
  messageContainerRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#eafaff',
    maxWidth: '75%',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 11,
    opacity: 0.7,
  },
})

export default ChatScreen
