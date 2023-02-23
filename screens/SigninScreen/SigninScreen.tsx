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
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface SigninScreenProps {}

const SigninScreen: React.FunctionComponent<SigninScreenProps> = (props) => {
  const [email, setEmail] = useState<string>('');
  const [motDePasse, setMotDePasse] = useState<string>('');

  return (
    <LinearGradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      className=' w-screen h-screen px-22'
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
            }}
          >
            Découvrez, achetez, vendez
          </Text>
        </View>

        <View className='m-15 flex flex-col justify-around items-center h-[45%]'>
          <View className='h-[80%] flex flex-col justify-center'>
            <View className='h-[25%] mb-5'>
              <Text className='font-antipasto text-black text-left text-3xl'>Se connecter :</Text>
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
                value={motDePasse}
                onChangeText={setMotDePasse}
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
            <Text className='text-black text-lg font-antipasto'> Connexion</Text>
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
              <Text className='text-black text-lg font-antipasto'>
                {' '}
                Continuer avec google <FontAwesomeIcon name='google-plus' size='15%' />
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
              <Text className='text-black text-lg font-antipasto'>
                {' '}
                Continuer avec Facebook <FontAwesomeIcon name='facebook' size='15%' />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // alignItems: 'center',
    padding: 22,
    justifyContent: 'space-between',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginBottom: 40,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 12,
  },

  titre: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontFamily: 'Gentle',
    color: '#3FA96A',
    fontSize: 20,
  },
  text2: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'antipasto',
  },
  titre2: {
    fontFamily: 'antipasto', // Custom font family
    color: 'black', // White color
    fontSize: 23, // 60 font size
    marginLeft: 20,
  },
  bloc: {
    margin: 15,
  },
  inputContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    width: 300,
  },

  input: {
    height: 40,
    width: 240,
    fontSize: 20,
  },
  boxNetworks: {
    marginBottom: 100,
  },
  box: {
    alignItems: 'center',
    backgroundColor: '#3FA96A',
    borderRadius: 25,
    marginBottom: 30,
  },
  button: {
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
  },

  textButton: {
    color: 'black',
    fontFamily: 'antipasto',
    fontSize: 18,
  },
  ou: {
    color: 'black',
    marginBottom: 20,
  },
});

export default SigninScreen;
