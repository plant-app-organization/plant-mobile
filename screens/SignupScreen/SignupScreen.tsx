import React, { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native'
import { sessionIdVar } from '../../variables/session'

import { Spinner } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Box, Input, Pressable, Icon } from 'native-base'
import { useSignUp } from '@clerk/clerk-expo'
import { SignUpWithOAuth } from '../../components/SignUpWithOAuth/SignUpWithOAuth'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { MaterialIcons } from '@expo/vector-icons'

interface SignupScreenProps {}

const SignupScreen: React.FunctionComponent<SignupScreenProps> = (props) => {
  const [username, setUsername] = useState<string>('')
  const [emailAddress, setEmailAddress] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { isLoaded, signUp } = useSignUp()
  const [show, setShow] = React.useState(false)
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)

  const handleTextChange = (inputText) => {
    setEmailAddress(inputText.toLowerCase())
  }

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }
    console.log('credential', username, emailAddress)
    setIsLoading(true)
    try {
      await signUp
        .create({
          emailAddress,
          username,
          password,
        })
        .then((result) => {
          console.log('result from signup create', result)
          if (result.status === 'complete') {
            console.log(result)
            sessionIdVar(result.createdSessionId)
          } else {
            console.log(result)
          }
        })
        .catch((err) => console.error('error', err.errors[0].longMessage))

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      props.navigation.navigate('VerifyCode')
    } catch (err: any) {
      console.log('Error:> ' + err?.status || '')
      console.log('Error:> ' + err?.errors ? JSON.stringify(err.errors) : err)
    }
  }
  const onSignInPress = () => props.navigation.replace('SigninScreen')

  return (
    <LinearGradient colors={['#C3EEEF', 'white', 'white']} className='w-screen h-screen px-22'>
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      >
        <View className='w-full h-full px-22'>
          <View className='flex items-center justify-evenly h-[25%] relative'>
            <Image source={require('../../assets/plantb.png')} className='w-40 h-24' />
            <Text className='w-[90%] text-black text-lg tracking-wide'>
              <Text className='font-bold'>Inscrivez-vous </Text>
              pour découvrir, acheter et vendre des plantes
            </Text>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className='w-[40px] h-[40px] justify-center items-center rounded-full border border-gray-200 bg-white opacity-50 absolute top-5 left-5 z-10 shadow'
            >
              <ChevronLeftIcon color={'black'} />
            </TouchableOpacity>
          </View>

          <View className='w-full justify-around items-center h-[30%]'>
            <Input
              variant='rounded'
              size='xl'
              borderColor={'#737373'}
              w={'80%'}
              placeholder='Nom'
              value={username}
              onChangeText={setUsername}
              autoCapitalize='none'
              autoCorrect={false}
            />

            <Input
              variant='rounded'
              size='xl'
              borderColor={'#737373'}
              w={'80%'}
              placeholder='Email'
              value={emailAddress}
              onChangeText={handleTextChange}
              autoCapitalize='none'
              autoCorrect={false}
            />

            <Input
              variant='rounded'
              size='xl'
              borderColor={'#737373'}
              w={'80%'}
              placeholder='Mot de passe'
              value={password}
              onChangeText={setPassword}
              // secureTextEntry={true}
              type={show ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                    size={5}
                    mr='2'
                    color='muted.400'
                  />
                </Pressable>
              }
            />
          </View>

          <View className='w-full h-[40%] flex flex-col justify-evenly items-center'>
            {!isLoading ? (
              <TouchableOpacity
                className='h-[45px] w-[80%] rounded-full items-center justify-center bg-black shadow-lg'
                onPress={onSignUpPress}
              >
                <Text className='text-white text-lg tracking-widest'> Créer mon compte</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className='h-[45px] w-[80%] rounded-full items-center justify-center bg-black shadow-lg opacity-70'>
                <Spinner color='white' />
              </TouchableOpacity>
            )}
            <Text className='font-semibold'>OU</Text>
            <View className='h-[45%] flex flex-col justify-around'>
              {/* <SignUpWithOAuth /> */}

              {/* <TouchableOpacity
                className='h-[45px] w-[80%] flex flex-row rounded-full items-center justify-evenly bg-white shadow-sm border border-gray-300'
                onPress={() => console.log('fb')}
              >
                <View className='w-[25px] h-[25px] items-center justify-center rounded-full bg-[#395590]'>
                  <FontAwesomeIcon name='facebook' size={15} color='white' />
                </View>
                <Text className='text-black font-semibold text-md tracking-widest'>
                  Continuer avec Facebook
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                className='h-[45px] w-[300px] rounded-full items-center border-2 border-solid justify-center'
                onPress={onSignInPress}
              >
                <Text className='text-black text-ml font-Roboto'>
                  Déjà inscrit ? Connectez-vous !
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SignupScreen
