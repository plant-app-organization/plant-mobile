import React, { useState, useRef, useEffect } from 'react'
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
import { Button, Box, Input } from 'native-base'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useSignUp } from '@clerk/clerk-expo'
import { SignUpWithOAuth } from '../../components/SignUpWithOAuth/SignUpWithOAuth'

interface SignupScreenProps {}

const SignupScreen: React.FunctionComponent<SignupScreenProps> = (props) => {
  const [username, setUsername] = useState<string>('')
  const [emailAddress, setEmailAddress] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { isLoaded, signUp } = useSignUp()

  const handleTextChange = (inputText) => {
    setEmailAddress(inputText.toLowerCase())
  }

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp
        .create({
          username,
          emailAddress,
          password,
        })
        .then((result) => {
          console.log('result from signup create', result)
          if (result.status === 'complete') {
            console.log(result)
            sessionIdVar(result.createdSessionId)
          } else {
            // console.log(result);
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
    <LinearGradient colors={['#cfe9f1', '#eafdf4', '#FEFFFF']} className=' w-screen h-screen px-22'>
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      >
        <View className='w-full h-full px-22'>
          <View className='flex items-center justify-end h-[15%]'>
            <Text style={{ color: 'black' }} className='font-Gentle text-3xl'>
              Plante.
            </Text>
            <Text
              style={{
                width: '100%',
                height: '28%',
              }}
              className='text-black text-center text-xl font-Roboto '
            >
              Découvrez, achetez, vendez
            </Text>
          </View>

          <View className='m-15 flex flex-col justify-around items-center h-[45%]'>
            <View className='h-[80%] flex flex-col justify-center'>
              <View className='h-[25%]'>
                <Text className='font-Roboto  text-black text-left text-xl'>S'inscrire :</Text>
              </View>
              <View
                style={{
                  position: 'relative',

                  paddingLeft: 20,
                  marginBottom: 20,
                  width: 300,
                }}
              >
                <Input
                  variant='rounded'
                  size='md'
                  placeholder='Nom'
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
              </View>

              <View
                style={{
                  position: 'relative',

                  paddingLeft: 20,
                  marginBottom: 20,
                  width: 300,
                }}
              >
                <Input
                  variant='rounded'
                  size='md'
                  placeholder='Email'
                  value={emailAddress}
                  onChangeText={handleTextChange}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
              </View>

              <View
                style={{
                  position: 'relative',

                  paddingLeft: 20,
                  marginBottom: 20,
                  width: 300,
                }}
              >
                <Input
                  variant='rounded'
                  size='md'
                  placeholder='Mot de passe'
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
              </View>
            </View>
            <TouchableOpacity
              className='h-[45px] w-[200px] rounded-2xl flex items-center justify-center border-solid border-2 '
              onPress={onSignUpPress}
            >
              <Text className='text-black text-ml font-Roboto'> Créer mon compte</Text>
            </TouchableOpacity>
          </View>

          <View className='w-full h-[40%] flex flex-col justify-evenly items-center'>
            <Text className='font-Roboto '>OU</Text>
            <View className='h-[45%] flex flex-col justify-around'>
              <SignUpWithOAuth />

              <TouchableOpacity
                className='h-[45px] w-[300px] rounded-2xl flex items-center justify-center border-2 border-solid  mb-8 mt-8'
                onPress={() => console.log('hello facebook')}
              >
                <Text style={{ color: '#395590' }} className='text-black text-ml font-Roboto '>
                  Continuer avec Facebook <FontAwesomeIcon name='facebook' size={19} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='h-[45px] w-[300px] rounded-2xl flex items-center border-2 border-solid justify-center'
                onPress={onSignInPress}
              >
                <Text className='text-black text-ml font-Roboto '>
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
