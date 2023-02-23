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
  const [motDePasse, setMotDePasse] = useState<string>('');

  return (
    <LinearGradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      className=' w-full h-full px-22'
    >
      <View className='w-full h-full px-22 justify-between'>
        <View className='flex items-center justify-center'>
          <Text style={{ color: '#3FA96A' }} className='font-gentle text-3xl'>
            Plante.
          </Text>
          <Text className='text-white text-2xl font-antipasto'>Découvrez, achetez, vendez</Text>
        </View>
        <View className='flex items-start justify-start'>
          <Text className='font-antipasto text-black text-3xl ml-20'>S'inscrire :</Text>
        </View>
        <View className='m-15'>
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
              <Text style={{ fontFamily: 'antipasto', fontSize: 18, textAlign: 'left' }}>Nom</Text>
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
              <Text style={{ fontFamily: 'antipasto', fontSize: 18, textAlign: 'left' }}>
                Email
              </Text>
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
              marginBottom: 20,
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
              <Text style={{ fontFamily: 'antipasto', fontSize: 18, textAlign: 'left' }}>
                Mot de passe
              </Text>
            </View>
            <TextInput
              style={{ height: 40, width: 240, fontSize: 20 }}
              value={motDePasse}
              onChangeText={setMotDePasse}
            />
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#3FA96A',
              borderRadius: 25,
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              style={{
                height: 45,
                width: 280,
                borderRadius: 25,
                backgroundColor: '#ccedcf',
                alignItems: 'center',
                justifyContent: 'center',
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

          <Text className='text-black mb-20'>ou</Text>
          <View className='mb-100'>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#3FA96A',
                borderRadius: 25,
                marginBottom: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 45,
                  width: 280,
                  borderRadius: 25,
                  backgroundColor: '#ccedcf',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                <Text className='text-black text-lg font-antipasto'>
                  {' '}
                  Continuer avec google <FontAwesomeIcon name='google-plus' size='15%' />
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#3FA96A',
                borderRadius: 25,
                marginBottom: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 45,
                  width: 280,
                  borderRadius: 25,
                  backgroundColor: '#ccedcf',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                <Text className='text-black text-lg font-antipasto'>
                  {' '}
                  Continuer avec Facebook <FontAwesomeIcon name='facebook' size='15%' />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignupScreen;
