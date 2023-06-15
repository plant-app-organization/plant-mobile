import React, { useState } from 'react'
import {
  Platform,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  SafeAreaView,
  Button,
  ScrollView,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'native-base'
import { useUser } from '@clerk/clerk-expo'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid'

interface ChatScreenProps {}

const ChatScreen: React.FunctionComponent<ChatScreenProps> = (props) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, message: 'Bonjour' },
    { id: 2, message: 'Comment ça va ?' },
    { id: 3, message: 'Je vais bien, merci !' },
  ])

  const fadeIn = new Animated.Value(0)
  const { isSignedIn, user } = useUser()

  const navigation = useNavigation()
  const handleSend = () => {
    if (message.trim() === '') return

    const newMessage = { id: messages.length + 1, message }
    setMessages([...messages, newMessage])
    setMessage('')

    fadeIn.setValue(0)
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#CFF5FF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <LinearGradient colors={['#CFF5FF', 'white']} className='w-full h-[100px]'>
        <View className='flex items-center justify-center mb-10 mt-10  '>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-[40px] h-[40px] justify-center items-center rounded-full border border-gray-200 bg-white opacity-50 absolute  left-5 z-10 shadow'
          >
            <ChevronLeftIcon color={'black'} />
          </TouchableOpacity>
          <Avatar
            style={{}}
            bg='amber.500'
            source={{
              uri: user?.profileImageUrl,
            }}
            size='md'
          >
            NB
            <Avatar.Badge bg='green.500' size='23%' />
          </Avatar>
        </View>
      </LinearGradient>

      <ScrollView className='w-full h-screen px-5 flex bg-white 	'>
        <View style={styles.chatContainer}>
          {messages.map((item) => (
            <View
              key={item.id}
              style={[
                styles.messageContainer,
                item.id % 2 === 0 ? styles.messageContainerRight : styles.messageContainerLeft,
              ]}
            >
              <Animated.Text style={[styles.message]}>{item.message}</Animated.Text>
            </View>
          ))}
        </View>

        <Button title='Rafraîchir' onPress={''} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Tapez votre message ici'
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSend}>
            <Text style={styles.buttonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    paddingHorizontal: 1,
  },
  messageContainer: {
    backgroundColor: '#e5e6e8',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  message: {
    fontSize: 16,
    color: 'black',
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

    alignItems: 'flex-start',
  },
  messageContainerRight: {
    alignSelf: 'flex-end',

    alignItems: 'flex-end',
  },
})

export default ChatScreen
