import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'native-base';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface ProfileScreenProps {}

const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = (props) => {
  const images = [
    require('../../assets/avatar1.png'),
    require('../../assets/avatar2.png'),
    require('../../assets/avatar3.png'),
    require('../../assets/avatar4.png'),
  ];

  const [progress, setProgress] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const handleButtonClick = () => {
    if (progress < 25) {
      setProgress(progress + 5);
      setImageIndex(0);
    } else if (progress < 50) {
      setProgress(progress + 5);
      setImageIndex(1);
    } else if (progress < 75) {
      setProgress(progress + 5);
      setImageIndex(2);
    } else if (progress <= 95) {
      setProgress(progress + 5);
      setImageIndex(3);
    } else {
      setProgress(progress);
      setImageIndex(3);
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

  return (
    <LinearGradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      className='h-screen w-screen flex-1'
    >
      <View className='h-screen w-screen flex-1 p-10 justify-between'>
        <View className='flex-1 items-center '>
          <Image
            source={images[imageIndex]}
            style={{
              marginTop: 20,
              width: '50%',
              height: '65%',
              shadowColor: '#000',
              shadowOffset: {
                width: 10,
                height: 1,
              },
              shadowOpacity: 0.32,
              shadowRadius: 4.1,
            }}
          />
          <View className='w-screen rounded-lg p-4'>
            <ProgressBar progress={progress} height={15} color='#3FA96A' />
            <Button title='Progress' onPress={handleButtonClick} />
          </View>
        </View>
        <TouchableOpacity className=' flex-1' onPress={console.log('profil')}>
          <View className='flex-1 flex-row items-center w-screen justify-between'>
            <View className='justify-start'>
              <View className='flex-1 flex-row items-center w-screen'>
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
                    uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
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
                <View className='ml-2'>
                  <Text style={{ fontFamily: 'antipasto', fontSize: 18 }}>Mathis</Text>
                  <Text style={{ marginTop: 6, marginBottom: 6 }}>{personalPlants}</Text>

                  <Text style={{ fontFamily: 'antipasto', fontSize: 18 }}>Voir mon profil</Text>
                </View>
              </View>
            </View>
            <FontAwesomeIcon style={{ marginRight: 19 }} name='angle-right' size={20} />
          </View>
        </TouchableOpacity>

        <View className='items-center p-30 justify-between flex-1'>
          <View className='h-px w-screen bg-black opacity-30' />
          <TouchableOpacity
            className='w-screen items-center flex-row flex-1 justify-start'
            onPress={console.log('favoris')}
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
            className='w-screen items-center flex-row flex-1 justify-start'
            onPress={console.log('ventes')}
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
            className='w-screen items-center flex-row flex-1 justify-start'
            onPress={console.log('parametres')}
          >
            <View className='w-screen items-center flex-row flex-1 justify-start p-2'>
              <FontAwesomeIcon className='opacity-30' name='gears' size={20} />
              <Text className='text-lg font-antipasto ml-3'> Paramètres </Text>
            </View>
            <View>
              <FontAwesomeIcon name='angle-right' size={20} />
            </View>
          </TouchableOpacity>
          <View className='h-px w-screen bg-black opacity-30' />
          <TouchableOpacity
            className='flex-1 flex-row items-center h-10 w-screen justify-between'
            onPress={console.log('avis')}
          >
            <View className='w-screen items-center flex-row flex-1 justify-start p-2'>
              <FontAwesomeIcon className='opacity-30' name='commenting' size={18} />
              <Text className='text-lg font-antipasto ml-3'> Mes avis </Text>
            </View>
            <View>
              <FontAwesomeIcon name='angle-right' size={18} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;
