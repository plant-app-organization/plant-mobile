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
  ScrollView,
} from 'react-native'
import { useToast, Input, InputGroup } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useSignIn } from '@clerk/clerk-expo'
import { SignInWithOAuth } from '../../components/SignInWithOAuth/SignInWithOAuth'

interface SigninScreenProps {}
//
//
const SigninScreen: React.FunctionComponent<SigninScreenProps> = (props) => {
  const [emailAddress, setEmailAddress] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { signIn, setSession, isLoaded } = useSignIn()
  const toast = useToast()

  const handleTextChange = (inputText) => {
    setEmailAddress(inputText.toLowerCase())
  }

  const onSignInPress = async () => {
    if (!isLoaded) {
      return
    }

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
        })
      }
      console.log('Error:> ' + (err.errors ? err.errors[0].message : err))
    }
  }

  const onSignUpPress = () => props.navigation.replace('SignupScreen')

  return (
    <LinearGradient colors={['#cfe9f1', '#eafdf4', '#FEFFFF']} className=' w-screen h-screen px-22'>
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      >
        <View className='w-full h-full px-22'>
          <View className='flex items-center justify-end h-[15%]'>
            <Text style={{ color: '#3FA96A' }} className='font-Gentle text-3xl'>
              Plante.
            </Text>
            <Text
              className='text-white text-center text-xl font-antipasto'
              style={{
                width: '100%',
                height: '28%',
                shadowColor: '#3FA96A',
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 3.22,
                shadowRadius: 5.1,
                elevation: 10, // pour Android seulement
              }}
            >
              Découvrez, achetez, vendez
            </Text>
          </View>

          <View className='m-15 flex flex-col justify-around items-center h-[45%]'>
            <View className='h-[80%] flex flex-col justify-center'>
              <View className='h-[25%] mb-5'>
                <Text className='font-antipasto text-black text-left text-xl'>Se connecter :</Text>
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
                />
              </View>

              <View
                style={{
                  position: 'relative',

                  paddingLeft: 20,

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
              className='h-[45px] w-[200px] rounded-3xl flex items-center justify-center'
              style={{
                backgroundColor: '#ccedcf',
                shadowColor: '#3FA96A',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 15.22,
                shadowRadius: 12.1,
                elevation: 10, // pour Android seulement
              }}
              onPress={onSignInPress}
            >
              <Text className='text-black text-lg font-antipasto'> Connexion</Text>
            </TouchableOpacity>
          </View>

          <View className='w-full h-[40%] flex flex-col justify-evenly items-center'>
            <Text>OU</Text>
            <View className='h-[45%] flex flex-col justify-around'>
              <TouchableOpacity
                className='h-[45px] w-[300px] rounded-3xl flex items-center justify-center'
                style={{
                  backgroundColor: '#ccedcf',
                  shadowColor: '#3FA96A',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 15.22,
                  shadowRadius: 12.1,
                  elevation: 10, // pour Android seulement
                }}
                onPress={() => console.log('hello facebook')}
              >
                <Text style={{ color: '#d24e41' }} className='text-black text-ml font-Roboto'>
                  Continuer avec google <FontAwesomeIcon name='google' size={15} />
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                className='h-[45px] w-[300px] rounded-3xl flex items-center justify-center mb-8 mt-8'
                style={{
                  backgroundColor: '#ccedcf',
                  shadowColor: '#3FA96A',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 15.22,
                  shadowRadius: 12.1,
                      elevation: 10, // pour Android seulement

                }}

                onPress={onSignUpPress}
              >
               
                <Text style={{ color: '#395590' }} className='text-black text-ml font-Roboto'>
                Pas encore inscrit ? Créer un commpte !
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                className='h-[45px] w-[280px] rounded-3xl flex items-center justify-center'
                style={{
                  backgroundColor: '#ccedcf',
                  shadowColor: '#3FA96A',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 15.22,
                  shadowRadius: 12.1,
                }}
                onPress={() => console.log('fb')}
              >
                <Text style={{ color: '#395590' }} className='text-black text-ml font-Roboto'>
                  Continuer avec Facebook <FontAwesomeIcon name='facebook' size={15} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='h-[45px] w-[300px] rounded-3xl flex items-center justify-center'
                style={{
                  backgroundColor: '#ccedcf',
                  shadowColor: '#3FA96A',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 15.22,
                  shadowRadius: 12.1,
                  elevation: 10, // pour Android seulement
                }}
                onPress={onSignUpPress}
              >
                <Text className='text-black text-ml font-Roboto'>
                  Pas encore inscrit ? Créer un compte !
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SigninScreen
