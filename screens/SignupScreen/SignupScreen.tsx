import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { Spinner } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Box } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface SignupScreenProps {}

const SignupScreen: React.FunctionComponent<SignupScreenProps> = (props) => {
  const [nom, setNom] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <LinearGradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      className=' w-screen h-screen px-22'
    >
      <SafeAreaView>
        <View className='w-full h-full px-22'>
          <View className='flex items-center justify-end h-[15%]'>
            <Text style={{ color: '#3FA96A' }} className='font-Gentle text-3xl'>
              Plante.
            </Text>
            <Text
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
              }}
              className='text-white text-center text-xl font-antipasto'
            >
              Découvrez, achetez, vendez
            </Text>
          </View>

          <View className='m-15 flex flex-col justify-around items-center h-[45%]'>
            <View className='h-[80%] flex flex-col justify-center'>
              <View className='h-[25%]'>
                <Text className='font-antipasto text-black text-left text-2xl'>S'inscrire :</Text>
              </View>
              <View
                style={{
                  position: 'relative',
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 25,
                  paddingLeft: 20,
                  marginBottom: 20,
                  width: 300,
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: 10,
                    backgroundColor: '#a6e6ad',
                    paddingHorizontal: 5,
                  }}
                >
                  <Text className='font-antipasto text-sm text-left'>Nom</Text>
                </View>
                <TextInput
                  style={{ height: 40, width: 240, fontSize: 20 }}
                  value={nom}
                  onChangeText={setNom}
                />
              </View>
              <View
                style={{
                  position: 'relative',
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 25,
                  paddingLeft: 20,
                  marginBottom: 20,
                  width: 300,
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: 10,
                    backgroundColor: '#95e79c',
                    paddingHorizontal: 5,
                  }}
                >
                  <Text className='font-antipasto text-sm text-left'>Email</Text>
                </View>
                <TextInput
                  style={{ height: 40, width: 240, fontSize: 20 }}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View
                style={{
                  position: 'relative',
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 25,
                  paddingLeft: 20,
                  // marginBottom: 20,
                  width: 300,
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: 10,
                    backgroundColor: '#8CE795',
                    paddingHorizontal: 5,
                  }}
                >
                  <Text className='font-antipasto text-sm text-left'>Mot de passe</Text>
                </View>
                <TextInput
                  style={{ height: 40, width: 240, fontSize: 20 }}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>
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
              onPress={() => console.log('hello toi')}
            >
              <Text className='text-black text-lg font-antipasto'> Créer mon compte</Text>
            </TouchableOpacity>
          </View>

          <View className='w-full h-[40%] flex flex-col justify-evenly items-center'>
            <Text>OU</Text>
            <View className='h-[45%] flex flex-col justify-around'>
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
                onPress={() => console.log('hello google')}
              >
                <Text style={{ color: '#d24e41' }} className='text-black text-lg font-antipasto '>
                  {' '}
                  Continuer avec google <FontAwesomeIcon name='google-plus' size={15} />
                </Text>
              </TouchableOpacity>
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
                onPress={() => console.log('hello facebook')}
              >
                <Text style={{ color: '#395590' }} className='text-black text-lg font-antipasto'>
                  {' '}
                  Continuer avec Facebook <FontAwesomeIcon name='facebook' size={15} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignupScreen;
