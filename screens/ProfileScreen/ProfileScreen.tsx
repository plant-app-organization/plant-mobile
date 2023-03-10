import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'native-base';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ConfettiCannon from 'react-native-confetti-cannon';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

interface ProfileScreenProps {}

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
  const [modalVisible, setModalVisible] = useState(false);
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
      setModalVisible(true);
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
      style = { color: 'yellow' };
    }
    personalPlants.push(<FontAwesomeIcon name='star' style={style} />);
  }

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <LinearGradient
      colors={['#f2fff3', '#bee6c2', '#f2fff3', '#f2fff3', '#f2fff3', '#bee6c2']}
      className='h-screen w-screen flex-1'
    >
      <Modal visible={modalVisible} safeAreaTop={true}>
        <View className='justify-center item-center	bg-transparent'>
          <View style={styles.modalContainer}>
            <ConfettiCannon
              count={200}
              explosionSpeed={600}
              fallSpeed={3000}
              origin={{ x: -10, y: 0 }}
              autoStart={true}
            />
            <Text className='font-antipasto text-black font-bold text-4xl'>Felicitation !!!</Text>
            <Animated.Image
              source={images[imageIndex]}
              style={[
                styles.image,
                {
                  transform: [
                    {
                      scale: zoomValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Text className='font-antipasto text-black font-bold text-2xl'>
              Bravo, tu passes au niveau suivant, ??volution en {name[nameEvo]}
            </Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={handleModalClose}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <SafeAreaView className='h-screen w-screen flex-1 justify-between'>
        <View className='flex-1 items-center pr-10 pl-10'>
          <Image
            source={images[imageIndex]}
            style={{
              marginTop: 20,
              width: 130,
              height: 120,
              shadowColor: '#000',
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.32,
              shadowRadius: 4.1,
            }}
          />
          <View className='w-screen rounded-lg p-4'>
            {/* <ProgressBar progress={progress} height={15} color='#3FA96A' /> */}
            <Button title='Progress' onPress={handleButtonClick} />
          </View>
        </View>
        <View className=' flex-1 flex-column w-screen justify-start'>
          <View className='flex-row w-screen items-start justify-between mt-4 ml-2'>
            <Avatar
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 9,
                  height: 0,
                },
                shadowOpacity: 0.22,
                shadowRadius: 4.1,
              }}
              bg='amber.500'
              source={{
                uri: user?.profileImageUrl,
              }}
              size='lg'
            >
              NB
              <Avatar.Badge
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 5,
                    height: 0,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 4.1,
                }}
                bg='green.500'
                size='23%'
              />
            </Avatar>
            <View className='ml-6'>
              <Text style={{ fontFamily: 'antipasto', fontSize: 18 }}>{user?.username}</Text>
              <Text style={{ marginTop: 8, marginBottom: 8 }}>{personalPlants}</Text>

              <Text style={{ fontFamily: 'antipasto', fontSize: 18 }}>Voir mon profil</Text>
            </View>
            <View className='flex-1 items-center justify-center'></View>
            <FontAwesomeIcon
              style={{ marginRight: 19, marginTop: 12 }}
              name='angle-right'
              size={20}
            />
          </View>
          <View className='items-center mt-6 w-screen'>
            <Text>Mon impact</Text>
            <TouchableOpacity className='bg-transparent text-white	border-slate-400 border-solid rounded-2xl border p-2 mr-2'>
              <Text>CO2</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className='items-center p-30 justify-between flex-1'>
          <View className='h-px w-screen bg-black opacity-30' />
          <TouchableOpacity
            className='w-screen items-center flex-row flex-1 justify-start pr-6'
            onPress={() => console.log('favoris')}
          >
            <View className='w-screen items-center flex-row flex-1 justify-start p-2'>
              <FontAwesomeIcon className='opacity-30' name='heart' size={18} />
              <Text className='text-lg font-antipasto ml-3'> Favoris </Text>
            </View>
            <View>
              <FontAwesomeIcon name='angle-right' size={18} />
            </View>
          </TouchableOpacity>
          <View className='h-px w-screen bg-black opacity-30' />
          <TouchableOpacity
            className='w-screen items-center flex-row flex-1 justify-start pr-6'
            onPress={() => console.log('ventes')}
          >
            <View className='w-screen items-center flex-row flex-1 justify-start p-2'>
              <FontAwesomeIcon className='opacity-30' name='bookmark' size={18} />
              <Text className='text-lg font-antipasto ml-3'> Mes ventes et achats </Text>
            </View>
            <View>
              <FontAwesomeIcon name='angle-right' size={20} />
            </View>
          </TouchableOpacity>
          <View className='h-px w-screen bg-black opacity-30' />
          <TouchableOpacity
            className='w-screen items-center flex-row flex-1 justify-start pr-6'
            onPress={() => console.log('parametres')}
          >
            <View className='w-screen items-center flex-row flex-1 justify-start p-2'>
              <FontAwesomeIcon className='opacity-30' name='gears' size={20} />
              <Text className='text-lg font-antipasto ml-3'> Param??tres </Text>
            </View>
            <View>
              <FontAwesomeIcon name='angle-right' size={20} />
            </View>
          </TouchableOpacity>
          <View className='h-px w-screen bg-black opacity-30' />
          <TouchableOpacity
            className='flex-1 flex-row items-center h-10 w-screen justify-between pr-6'
            onPress={() => console.log('avis')}
          >
            <View className='w-screen items-center flex-row flex-1 justify-start p-2'>
              <FontAwesomeIcon className='opacity-30' name='commenting' size={18} />
              <Text className='text-lg font-antipasto ml-3'> Mes avis </Text>
            </View>
            <View>
              <FontAwesomeIcon name='angle-right' size={18} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className='w-screen items-center flex-row flex-1 justify-start'
            onPress={onSignOutPress}
          >
            <View className='w-screen items-center flex-row flex-1 justify-start p-2'>
              <FontAwesomeIcon className='opacity-30' name='gears' size={20} />
              <Text className='text-lg font-antipasto ml-3'>D??connexion</Text>
            </View>
            <View>
              <FontAwesomeIcon name='angle-right' size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#8CE795',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  modalCloseButton: {
    backgroundColor: '#3FA96A',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 1,
    },
    shadowOpacity: 0.32,
    shadowRadius: 4.1,
  },
});

export default ProfileScreen;
