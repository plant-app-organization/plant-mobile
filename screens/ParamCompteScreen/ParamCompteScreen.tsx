import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Select, FormControl, WarningOutlineIcon, CheckIcon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface ParamCompteScreenProps {}

const ParamCompteScreen: React.FunctionComponent<ParamCompteScreenProps> = (props) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  return (
    <LinearGradient
      colors={['#f2fff3', '#bee6c2', '#f2fff3', '#f2fff3', '#f2fff3', '#bee6c2']}
      className='h-screen w-screen flex-1'
    >
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      >
        <View className='w-screen h-full items-center justify-evenly '>
          <View className=' items-center mt-20'>
            <Text
              style={{
                shadowColor: 'white',
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 3.22,
                shadowRadius: 1.1,
              }}
              className='flex items-center text-2xl font-antipasto text-black  '
            >
              Paramétre du compte
            </Text>

            <View className='h-px w-screen bg-black opacity-30 -mb-15' />
          </View>
          <View className='h-[80%] flex flex-col justify-center m-3'>
            <View className=' flex-row mb-20'>
              <FontAwesomeIcon className='opacity-30' name='user-circle' size={50} />
              <Text className='text-lg font-antipasto ml-3 mt-3'> changer le photo de profil </Text>
            </View>
            <View
              style={{
                position: 'relative',
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 25,
                paddingLeft: 20,
                marginBottom: 30,
                width: 300,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: -25,
                  left: 10,
                  backgroundColor: 'transparent',
                  paddingHorizontal: 5,
                }}
              >
                <Text className='font-antipasto text-sm text-left text-xl font-antipasto'>
                  bio:
                </Text>
              </View>
              <TextInput
                style={{ height: 80, width: 240, fontSize: 15 }}
                value={bio}
                onChangeText={setBio}
                placeholder='je suis un passionné de plante depuis des années, je fais des boutures dans mon jardin à aix '
              />
            </View>

            <View
              style={{
                position: 'relative',
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 25,
                paddingLeft: 20,
                marginBottom: 30,
                width: 300,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: -25,
                  left: 10,
                  backgroundColor: 'transparent',
                  paddingHorizontal: 5,
                }}
              >
                <Text className='font-antipasto text-sm text-left text-xl font-antipasto'>
                  Mots de passe :
                </Text>
              </View>
              <TextInput
                style={{ height: 40, width: 240, fontSize: 15 }}
                value={password}
                onChangeText={setPassword}
                placeholder='***********'
              />
            </View>
            <View
              style={{
                position: 'relative',
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 25,
                paddingLeft: 20,
                marginBottom: 30,
                width: 300,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: -25,
                  left: 10,
                  backgroundColor: 'transparent',
                  paddingHorizontal: 5,
                }}
              >
                <Text className='font-antipasto text-sm text-left text-xl font-antipasto'>
                  Nouveau de mots de passe :
                </Text>
              </View>
              <TextInput
                style={{ height: 40, width: 240, fontSize: 15 }}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder='nouveau mots de passe'
              />
            </View>

            <View
              style={{
                position: 'relative',
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 25,
                paddingLeft: 20,
                marginBottom: 30,
                width: 300,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: -25,
                  left: 10,
                  backgroundColor: 'transparent',
                  paddingHorizontal: 5,
                }}
              >
                <Text className='font-antipasto text-sm text-left text-xl font-antipasto'>
                  email :
                </Text>
              </View>
              <TextInput
                style={{ height: 40, width: 240, fontSize: 15 }}
                value={email}
                onChangeText={setEmail}
                placeholder='plante.app@gmail.com'
              />
            </View>
            <View
              style={{
                position: 'relative',
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 25,
                paddingLeft: 20,

                width: 300,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: -25,
                  left: 10,
                  backgroundColor: 'transparent',
                  paddingHorizontal: 5,
                }}
              >
                <Text className='font-antipasto text-sm text-left text-xl font-antipasto'>
                  Nom :
                </Text>
              </View>
              <TextInput
                style={{ height: 40, width: 240, fontSize: 15 }}
                value={name}
                onChangeText={setName}
                placeholder='Pucci'
              />
            </View>
            <View className='flex items-center mt-10 mb-10'>
              <View
                style={{
                  height: 40,
                  width: 200,
                  borderRadius: 15,
                  backgroundColor: '#ccedcf',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#3FA96A',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 1.22,
                  shadowRadius: 1.1,
                }}
              >
                <TouchableOpacity
                  className='h-40 w-200 rounded-10 bg-ccedcf flex items-center justify-center shadow-lg hover:shadow-xl'
                  onPress={() => navigation.navigate('ParamScreen')}
                >
                  <Text className='font-antipasto text-black text-lg font-bold'>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ParamCompteScreen;
