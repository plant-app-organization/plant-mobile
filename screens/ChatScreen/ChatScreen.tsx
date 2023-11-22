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
  Pressable,
  Keyboard,
  Button,
  RefreshControl,
  ScrollView,
  Touchable,
  useWindowDimensions,
  FlatList,
} from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { ReactiveVar } from '@apollo/client'
import moment from 'moment'
import localization from 'moment/locale/fr'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Avatar, Spinner, KeyboardAvoidingView, Modal, Fab, useToast } from 'native-base'
import { useAuth, useUser, isSignedIn } from '@clerk/clerk-expo'
import { ChevronLeftIcon, CameraIcon, PaperAirplaneIcon } from 'react-native-heroicons/solid'
import Pusher from 'pusher-js/react-native'
import { useGetOffersDataByIdsQuery } from '../../graphql/graphql'
import { useGetUserDataByIdQuery } from '../../graphql/graphql'
import { useGetConversationMessagesLazyQuery } from '../../graphql/graphql'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { formatPrice } from '../../lib/formatPrice'
import * as ImagePicker from 'expo-image-picker'
import { useReactiveVar } from '@apollo/client'
import { useSendMessageMutation, useOnMessageAddedSubscription } from '../../graphql/graphql'
import { tempImageVar } from '../../variables/tempImage'

interface ChatScreenProps {
  senderId: string
  receiverId: string
}

const ChatScreen: React.FunctionComponent<ChatScreenProps> = (props) => {
  const toast = useToast()
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const pictureFromCameraScreen = useReactiveVar(tempImageVar)
  const isFocused = useIsFocused()
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
  const [isLoaderOpen, setIsLoaderOpen] = useState<boolean | void | undefined>(false)
  const [isChooseImageSourceModalOpen, setIsChooseImageSourceModalOpen] = useState(false)
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
    if (isFocused) {
      refetchConversationData()
    }
  }, [isFocused])
  useEffect(() => {
    if (isSignedIn) {
      // Lancer la requête de bookmarks seulement si l'utilisateur est connecté
      console.log('conversationId In Chat Screen', conversationId)
      getConversationMessages()
    }
  }, [isSignedIn, getConversationMessages])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
    })
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

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
  const onSendMessagePress = async (imageUrl: string | void) => {
    console.log('XXX => message', message, 'imageUrl', imageUrl)
    if (message !== '' || imageUrl) {
      console.log(
        'existinConversationId',
        existingConversationId,
        'offerId',
        offerId,
        'message',
        message,
      )
      Keyboard.dismiss()

      const response = await sendMessage({
        variables: {
          newMessageInput: {
            existingConversationId: existingConversationId,
            offerId,
            text: imageUrl ? imageUrl : message,
          },
        },
      })
      // console.log('PPPPPPPPPPP     response', response)
      if (response.data?.sendMessage.result === true) {
        if (response.data?.sendMessage.conversationId !== conversationId) {
          setConversationId(response.data?.sendMessage.conversationId)
        }
        tempImageVar('')
        setMessage('')
      } else {
        toast.show({
          title: `L'envoi du message a échoué.`,
        })
      }
    }
  }
  const addImage = async () => {
    setIsChooseImageSourceModalOpen(false)

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    }).then((image) => {
      // console.log('image', image);
      if (image.canceled) {
        return
      }
      if (!image.canceled) {
        // console.log('image.assets', image.assets)
        setIsLoaderOpen(true)
        const data = new FormData()
        const source = {
          uri: image.assets[0].uri,
          type: 'image/jpeg',
          name: 'newPic',
        }
        data.append('file', source)
        data.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
        data.append('cloud_name', process.env.CLOUDINARY_CLOUD_NAME)
        fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'post',
          body: data,
        })
          .then((res) => res.json())
          .then(async (data) => {
            console.log('📸data.secure_url', data.secure_url)

            onSendMessagePress(data.secure_url)
            setIsLoaderOpen(false)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }
  // Variables for the subscription
  const subscriptionVariables = {
    conversationId,
  }

  useEffect(() => {
    if (message.slice(-5) === '.gif ') {
      // setIsDisabled(true)
      onSendMessagePress()
    }
  }, [message])
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

  useEffect(() => {
    if (pictureFromCameraScreen !== '') {
      onSendMessagePress(pictureFromCameraScreen)
    }
  }, [pictureFromCameraScreen])

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{
        flex: 1,
        backgroundColor: '#A0C7AC',
      }}
    >
      <View
        style={{ backgroundColor: '#A0C7AC' }}
        className={`w-screen flex-col items-center ${
          Platform.OS === 'android' ? 'pt-1' : 'pt-0'
        } pb-2 px-3`}
      >
        <View
          className={`w-full rounded-md flex flex-row  shadow py-1 px-3  bg-white ${
            Platform.OS === 'android' ? 'mt-0' : ''
          }`}
        >
          <TouchableOpacity
            className=' rounded-md flex items-center justify-center mr-1'
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon color={'#A0C7AC'} className='text-lg' />

            {/* <Text className='text-darkleaf text-lg font-manropeBold'>Précédent</Text> */}
          </TouchableOpacity>
          <View className='bg-white w-full flex bg-transparent'>
            <Text className={` text-xl`} style={{ fontFamily: 'manrope_bold', color: '#323232' }}>
              {userData?.userDataById?.userName}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className={` w-full rounded-md flex flex-row justify-between  shadow py-2 px-3 mx-3 mb-1  bg-white ${
            Platform.OS === 'android' ? 'mt-2' : 'mt-2'
          }`}
        >
          <View>
            <Text className='text-md' style={{ fontFamily: 'manrope_bold', color: '#323232' }}>
              {offerData?.OffersListByIds[0].plantName}
            </Text>
            <Text className='text-sm' style={{ fontFamily: 'manrope_regular', color: '#6EB3D5' }}>
              {offerData?.OffersListByIds[0].price &&
                formatPrice(offerData?.OffersListByIds[0].price.toString())}
            </Text>
            <Text className=' text-md' style={{ fontFamily: 'manrope', color: 'grey' }}>
              {offerData?.OffersListByIds[0].city}
            </Text>
          </View>
          <Image
            style={{ width: 80, height: 60 }}
            className='rounded-md'
            source={offerData?.OffersListByIds[0].pictures[0]}
            // placeholder={blurhash}
            contentFit='cover'
          />
        </TouchableOpacity>
      </View>

      <FlatList
        // style={{ flex: 1 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        ref={scrollViewRef}
        className='px-3 py-0'
        style={{ backgroundColor: 'white' }}
        data={conversationData?.MessagesList}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{
        //   flex: 1,
        //   flexGrow: 1,
        //   flexDirection: 'column',
        //   justifyContent: 'flex-end',
        // }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor='#87BC23'
            colors={['#87BC23', '#139DB8']}
          />
        }
        renderItem={({ item, index }) => (
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
                bg='warmGray.50'
                size='sm'
                source={{
                  uri: userData?.userDataById?.avatar,
                }}
              ></Avatar>
            )}
            {item.text.slice(-5) === '.gif ' ||
            item.text.slice(-5) === '.gif' ||
            item.text.slice(-4) === '.jpg' ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('Picture', { imageUrl: item.text })}
                className='mt-1 mb-1'
                // onLongPress={() =>
                //   (userDataInApollo.status === 'crew' || userDataInApollo.status === 'dev') &&
                //   setIsOpen(!isOpen)
                // }
              >
                <Image
                  style={{
                    width: width * 0.6,
                    height: height * 0.3,
                    resizeMode: 'cover',
                    borderRadius: 5,
                  }}
                  source={{ uri: item.text }}
                />
              </TouchableOpacity>
            ) : (
              <Animated.Text style={[styles.message]}>{item.text}</Animated.Text>
            )}
            <Animated.Text style={[styles.date]}>
              {moment().diff(item.createdAt, 'days') <= 2
                ? moment(item.createdAt).fromNow()
                : moment(item.createdAt).format('LL')}
            </Animated.Text>
          </View>
        )}
      />

      {/* </LinearGradient> */}

      <KeyboardAvoidingView
        style={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVisible && Platform.OS == 'android' ? 60 : 0}
      >
        {/* KEYBOARD */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            height: height * 0.08,
            marginBottom: 5,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder='Entrez votre message ici'
            value={message}
            onChangeText={(text) => setMessage(text)}
          />

          {!sendMessageLoading ? (
            <>
              <TouchableOpacity onPress={() => setIsChooseImageSourceModalOpen(true)}>
                <FontAwesome5Icon
                  name={'images'}
                  size={20}
                  color={'#73859e'}
                  className='mr-2 ml-1'
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                className={`${message == '' ? 'rounded-full opacity-60' : 'rounded-full'}`}
                onPress={() => onSendMessagePress()}
                disabled={message == '' ? true : false}
              >
                <PaperAirplaneIcon color='white' />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.button}
              className='rounded-full'
              onPress={onSendMessagePress}
              disabled={sendMessageLoading}
            >
              <Spinner color='white' />
            </TouchableOpacity>
          )}
        </View>
        {/* Image Upload Loader Modal */}
        <Modal isOpen={isLoaderOpen} safeAreaTop={true}>
          <Modal.Content maxWidth='350' style={{ backgroundColor: '#f2fff3' }}>
            <Modal.Body>
              <Spinner size='lg' color='emerald.500' accessibilityLabel='Loading image' />
              <Text
                className='font-semibold mb-3 text-sm text-center'
                style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
              >
                Envoi de l'image en cours ...
              </Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <Modal
          onClose={() => setIsChooseImageSourceModalOpen(false)}
          isOpen={isChooseImageSourceModalOpen}
          safeAreaTop={true}
        >
          <Modal.Content maxWidth='380' style={{ backgroundColor: '#f2fff3' }}>
            <Modal.Body>
              <View className='flex flex-row justify-around'>
                <TouchableOpacity
                  className=' rounded-md flex items-center justify-center bg-white shadow-lg px-2 py-1 mb-2 border-0 border-darkleaf'
                  style={{ width: 0.28 * width, height: 0.2 * width }}
                  onPress={addImage}
                >
                  <FontAwesome5Icon name={'images'} size={28} color={'#73859e'} />

                  {/* <PhotoIcon color={'#A0C7AC'} size={32} /> */}
                  <Text className='text-magicgrey text-xs font-manrope'>
                    À partir de la bibliothèque
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=' rounded-md flex items-center justify-center bg-white shadow-lg px-2 py-0 border-0 border-darkleaf'
                  style={{ width: 0.28 * width, height: 0.2 * width }}
                  onPress={() => {
                    navigation.navigate('CameraScreen')
                    setIsChooseImageSourceModalOpen(false)
                  }}
                >
                  <CameraIcon color={'#73859e'} size={32} />
                  <Text className='text-magicgrey text-center text-xs font-manrope'>
                    Prendre une photo
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    paddingHorizontal: 0,
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
    color: '#323232',
    fontFamily: 'manrope_regular',
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
    fontFamily: 'manrope_bold',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,

    fontSize: 16,
    shadowColor: '#3FA96A',
  },
  button: {
    backgroundColor: '#223726',
    width: 45,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
