import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'expo-image';

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient';
import { Avatar, Modal } from 'native-base';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ConfettiCannon from 'react-native-confetti-cannon';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import PokemonModal from '../../components/modal/PokemonModal';

interface ProfileScreenProps {
  progress: number;
}

const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = (props) => {
  const images = [
    require('../../assets/avatar1.png'),
    require('../../assets/avatar2.png'),
    require('../../assets/avatar3.png'),
    require('../../assets/avatar4.png'),
  ];
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    props.navigation.replace('SigninScreen');
  }

  const name = ['Joliflor', 'Floraroma', 'Beautiflore', 'Melodiflore'];
  const { getToken, signOut } = useAuth();
  const [sessionToken, setSessionToken] = React.useState('');
  const [progress, setProgress] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean | void | undefined>(false);
  const zoomValue = useRef(new Animated.Value(0)).current;
  const [nameEvo, setNameIndex] = useState(0);
  const onSignOutPress = async () => {
    try {
      await signOut();
      await SecureStore.deleteItemAsync('__clerk_client_jwt');
    } catch (err: any) {
      console.log('Error:> ' + err?.status || '');
      console.log('Error:> ' + err?.errors ? JSON.stringify(err.errors) : err);
    }
  };
  useEffect(() => {
    const scheduler = setInterval(async () => {
      const token = await getToken();
      setSessionToken(token as string);
    }, 1000);

    return () => clearInterval(scheduler);
  }, []);
  useEffect(() => {
    Animated.timing(zoomValue, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (imageIndex > 0) {
      setIsOpen(true);
    }
  }, [imageIndex]);

  const handleButtonClick = () => {
    if (progress < 25) {
      setProgress(progress + 5);
      setImageIndex(0);
      setNameIndex(0);
    } else if (progress < 50) {
      setProgress(progress + 5);
      setImageIndex(1);
      setNameIndex(1);
    } else if (progress < 75) {
      setProgress(progress + 5);
      setImageIndex(2);
      setNameIndex(2);
    } else if (progress <= 95) {
      setProgress(progress + 5);
      setImageIndex(3);
      setNameIndex(3);
    } else {
      setProgress(progress);
      setImageIndex(3);
      setNameIndex(3);
    }
  };

  const personalPlants: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    let style = { color: 'black' };
    if (i < 3) {
      style = { color: 'orange' };
    }
    personalPlants.push(<FontAwesomeIcon name='star' style={style} />);
  }

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} safeAreaTop={true}>
        <Modal.Content
          style={{ backgroundColor: '#f2fff3' }}
          className='justify-center item-center	bg-transparent'
          maxWidth='350'
        >
          <Modal.Body>
            <View className='items-center rounded'>
              <Text className='font-antipasto text-black text-4xl'>Felicitations !!!</Text>
              <Animated.Image
                source={images[imageIndex]}
                style={{
                  marginTop: 20,
                  width: imageIndex === 1 ? 170 : 200,
                  height: imageIndex === 1 ? 190 : 200,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 5,
                    height: 1,
                  },
                  shadowOpacity: 0.32,
                  shadowRadius: 4.1,
                }}
              />
              <Text className='font-Roboto  text-black text-2xl'>
                Bravo, tu passes au niveau suivant, évolution en {name[nameEvo]}
              </Text>
              <TouchableOpacity
                className='rounded mt-10 p-3'
                style={{
                  backgroundColor: '#3FA96A',
                }}
                onPress={handleModalClose}
              >
                <Text className='text-white font-Roboto  align-center'>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <View className='w-full h-[30%] justify-evenly items-center'>
          <Image
            source={images[imageIndex]}
            className='w-[100px] h-[100px]'
            style={{
              // width: imageIndex === 1 ? 110 : 130,
              // height: imageIndex === 1 ? 125 : 130,
              shadowColor: '#000',
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.32,
              shadowRadius: 4.1,
            }}
          />
          <View className='w-10/12 h-[50px] justify-between rounded-lg'>
            <ProgressBar progress={progress} height={15} color='#3FA96A' />

            <TouchableOpacity className='items-center' onPress={handleButtonClick}>
              <Text>Progress</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className='w-full h-full px-4'>
          <View className='w-full h-[20%] flex-row border-b border-gray-200'>
            <View className='w-6/12 h-full flex-row items-center'>
              <Avatar
                bg='amber.500'
                source={{
                  uri: user?.profileImageUrl,
                }}
                size='lg'
              >
                NB
                <Avatar.Badge bg='green.500' size='23%' />
              </Avatar>

              <View className='ml-4'>
                <Text className='text-xl font-Roboto mb-2'>
                  {user?.username?.charAt().toUpperCase() + user?.username?.slice(1)}
                </Text>
                <Text>{personalPlants}</Text>
              </View>
            </View>

            <TouchableOpacity className='w-6/12 h-full flex-row items-center justify-end'>
              <Text className='font-Roboto text-sm mr-4'>Modifier mon profil</Text>
              <FontAwesomeIcon name='angle-right' size={20} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity className='w-full flex-row items-center justify-between py-5 border-b border-gray-200'>
            <FontAwesomeIcon className='opacity-30 w-1/12' name='heart' size={18} />
            <View className='w-10/12'>
              <Text>Mes favoris</Text>
            </View>
            <FontAwesomeIcon name='angle-right' size={18} />
          </TouchableOpacity>

          <TouchableOpacity className='w-full flex-row items-center justify-between py-5 border-b border-gray-200'>
            <FontAwesomeIcon className='opacity-30 w-1/12' name='euro' size={18} />
            <View className='w-10/12'>
              <Text>Mes ventes</Text>
            </View>
            <FontAwesomeIcon name='angle-right' size={18} />
          </TouchableOpacity>

          <TouchableOpacity className='w-full flex-row items-center justify-between py-5 border-b border-gray-200'>
            <FontAwesomeIcon className='opacity-30 w-1/12' name='shopping-cart' size={18} />
            <View className='w-10/12'>
              <Text>Mes achats</Text>
            </View>
            <FontAwesomeIcon name='angle-right' size={18} />
          </TouchableOpacity>

          <TouchableOpacity className='w-full flex-row items-center justify-between py-5 border-b border-gray-200'>
            <FontAwesomeIcon className='opacity-30 w-1/12' name='commenting' size={18} />
            <View className='w-10/12'>
              <Text>Mes avis</Text>
            </View>
            <FontAwesomeIcon name='angle-right' size={18} />
          </TouchableOpacity>

          <TouchableOpacity className='w-full flex-row items-center justify-between py-5'>
            <FontAwesomeIcon className='opacity-30 w-1/12' name='user' size={18} />
            <View className='w-10/12'>
              <Text>Me déconnecter</Text>
            </View>
            <FontAwesomeIcon name='angle-right' size={18} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;
