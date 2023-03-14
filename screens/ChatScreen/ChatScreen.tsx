import React, { useState } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//

interface ChatScreenProps {}

const ChatScreen: React.FunctionComponent<ChatScreenProps> = (props) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, message: 'Bonjour' },
    { id: 2, message: 'Comment ça va ?' },
    { id: 3, message: 'Je vais bien, merci !' },
  ]);

  const fadeIn = new Animated.Value(0);

  const handleSend = () => {
    if (message.trim() === '') return;

    const newMessage = { id: messages.length + 1, message };
    setMessages([...messages, newMessage]);
    setMessage('');

    fadeIn.setValue(0);
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
    <LinearGradient
      colors={['#f2fff3', '#bee6c2', '#f2fff3', '#f2fff3', '#f2fff3', '#bee6c2']}
      className='h-screen w-screen flex-1'
    >
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        className='h-screen w-screen flex-1 justify-start items-center'
      >
        <View className='w-screen items-center'>
          <Image
            style={{
              width: '30%',
              height: '38%',

              shadowColor: '#3FA96A',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 3.22,
              shadowRadius: 5.1,
            }}
            source={require('../../assets/logo.png')}
          />
        </View>
        <View className='h-screen w-screen flex-1 p-4 justify-start'>
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
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    paddingHorizontal: 1,
  },
  messageContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    height: 40,
    width: 200,
    shadowColor: '#3FA96A',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 15.22,
    shadowRadius: 16.1,
    elevation: 10, // pour Android seulement
  },
  message: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,

    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    fontSize: 16,
    shadowColor: '#3FA96A',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 16.22,
    shadowRadius: 5.1,
    elevation: 10, // pour Android seulement
  },
  button: {
    backgroundColor: '#8CE795',
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
    marginRight: '50%',
    textAlign: 'start',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  messageContainerRight: {
    alignSelf: 'flex-end',
    marginLeft: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default ChatScreen;
