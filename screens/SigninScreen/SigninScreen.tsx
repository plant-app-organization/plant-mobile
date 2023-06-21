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
  ScrollView,
  Image,
} from 'react-native'
import { useToast, Input, Pressable, Icon, Spinner } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { useSignIn } from '@clerk/clerk-expo'
import { SignInWithOAuth } from '../../components/SignInWithOAuth/SignInWithOAuth'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { MaterialIcons } from '@expo/vector-icons'

interface SigninScreenProps {}
//
//
const SigninScreen: React.FunctionComponent<SigninScreenProps> = (props) => {
  const [emailAddress, setEmailAddress] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { signIn, setSession, isLoaded } = useSignIn()
  const [show, setShow] = React.useState(false)
  const toast = useToast()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)

  const handleTextChange = (inputText) => {
    setEmailAddress(inputText.toLowerCase())
  }

  const onSignInPress = async () => {
    if (!isLoaded) {
      return
    }
    setIsLoading(true)
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      })

      await setSession(completeSignIn.createdSessionId)
    } catch (err) {
      if (err) {
        toast.show({
          title: 'Email ou mot de passe incorrect',
          placement: 'top',
        })
        setIsLoading(false)
      }
      console.log('Error:> ' + (err.errors ? err.errors[0].message : err))
    }
  }

  const onSignUpPress = () => props.navigation.replace('SignupScreen')

  return (
    <LinearGradient colors={['#C3EFD8', 'white', 'white']} className=' w-screen h-screen px-22'>
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      >
        <View className='flex items-center justify-evenly h-[25%] relative'>
          <Image source={require('../../assets/plantb.png')} className='w-40 h-24' />
          <Text className='w-[90%] text-black text-lg tracking-widest'>
            <Text className='font-bold'>Connectez-vous </Text>
            pour commencer à acheter ou vendre vos plantes
          </Text>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='w-[40px] h-[40px] justify-center items-center rounded-full border border-gray-200 bg-white opacity-50 absolute top-5 left-5 z-10 shadow'
          >
            <ChevronLeftIcon color={'black'} />
          </TouchableOpacity>
        </View>

        <View className='justify-evenly items-center h-[20%]'>
          <Input
            variant='rounded'
            size='xl'
            placeholder='Email'
            borderColor={'#737373'}
            value={emailAddress}
            onChangeText={handleTextChange}
            autoCapitalize='none'
            w={'80%'}
          />
          <Input
            variant='rounded'
            size='xl'
            borderColor={'#737373'}
            placeholder='Mot de passe'
            value={password}
            onChangeText={setPassword}
            // secureTextEntry={true}
            w={'80%'}
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

        <View className='w-full h-[60%]'>
          <View className='w-full h-[35%] items-center justify-evenly'>
            {!isLoading ? (
              <TouchableOpacity
                className='h-[45px] w-[80%] rounded-full flex items-center justify-center bg-black shadow-lg'
                onPress={onSignInPress}
              >
                <Text className='text-white text-lg tracking-widest'>Se connecter</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className='h-[45px] w-[80%] rounded-full flex items-center justify-center bg-black shadow-lg opacity-70'>
                <Spinner color='white' />
              </TouchableOpacity>
            )}

            <Text className='font-semibold'>OU</Text>
          </View>

          <View className='w-full h-[40%] items-center justify-evenly'>
            <TouchableOpacity
              className='h-[45px] w-[80%] flex flex-row rounded-full items-center justify-evenly bg-white shadow-sm border border-gray-300'
              onPress={() => console.log('hello facebook')}
            >
              <View className='w-[25px] h-[25px] bg-red-500 items-center justify-center rounded-full'>
                <FontAwesomeIcon name='google' size={15} color='white' />
              </View>
              <Text className='text-md font-semibold tracking-widest'>Continuer avec Google</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
                className='h-[45px] w-[300px] rounded-3xl flex items-center justify-center mb-8 mt-8'
                style={{
                  backgroundColor: '#ccedcf',
                 
                }}

                onPress={onSignUpPress}
              >
               
                <Text style={{ color: '#395590' }} className='text-black text-ml font-Roboto'>
                Pas encore inscrit ? Créer un commpte !
                </Text>
              </TouchableOpacity> */}
            <TouchableOpacity
              className='h-[45px] w-[80%] flex flex-row rounded-full items-center justify-evenly bg-white shadow-sm border border-gray-300'
              onPress={() => console.log('fb')}
            >
              <View className='w-[25px] h-[25px] items-center justify-center rounded-full bg-[#395590]'>
                <FontAwesomeIcon name='facebook' size={15} color='white' />
              </View>
              <Text className='text-black font-semibold text-md tracking-widest'>
                Continuer avec Facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='h-[45px] w-[80%] rounded-full items-center justify-center bg-white border border-gray-700 shadow-sm'
              onPress={onSignUpPress}
            >
              <Text className='text-black text-md font-semibold tracking-widest'>
                Créer un compte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SigninScreen
