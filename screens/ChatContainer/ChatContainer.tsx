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
  FlatList,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

//

interface ChatContainerProps {}

const ChatContainer: React.FunctionComponent<ChatContainerProps> = (props) => {
  const navigation = useNavigation()

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'John',
      avatar: require('../../assets/avatar1.jpeg'),
      subject: 'Nouveau message',
      message: 'Salut, comment ça va ?',
    },
    {
      id: 2,
      name: 'Jane',
      avatar: require('../../assets/avatar2.jpeg'),
      subject: 'Réunion demain',
      message: "N'oubliez pas la réunion prévue demain à 10h.",
    },
    // ...
  ])

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
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
        className='w-full h-[100px]'
      >
        <View className=' h-full flex-row items-center justify-center '>
          <Text className='text-m	 mr-4 text-xl' style={{ fontFamily: 'manrope_bold' }}>
            Boîte de réception
          </Text>

          <TouchableOpacity
            className=' h-full flex-row items-center justify-end ml-24  '
            onPress={() => navigation.navigate('ChatScreen')}
          >
            <FontAwesomeIcon name='angle-right' size={50} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <ScrollView className='w-full h-full px-5 flex bg-white 	'>
        <View style={styles.container}>
          <TouchableOpacity>
            <FlatList
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id.toString()}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
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
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
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

export default ChatContainer
