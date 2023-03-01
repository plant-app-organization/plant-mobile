import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Select, FormControl, WarningOutlineIcon, CheckIcon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface AddScreenProps {}

const AddScreen: React.FunctionComponent<AddScreenProps> = (props) => {
  const navigation = useNavigation();
  const [titre, setTitre] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [prix, setPrix] = useState<string>('');
  const [categorie, setCategorie] = useState<string>('');
  const [etat, setEtat] = useState<string>('');
  return (
    <LinearGradient
      colors={['#f2fff3', '#bee6c2', '#f2fff3', '#f2fff3', '#f2fff3', '#bee6c2']}
      className='h-screen w-screen flex-1'
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
            Vends une plante
          </Text>
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
                onPress={console.log('photo')}
              >
                <Text className='font-antipasto text-black text-lg font-bold'>
                  + AJOUTER DES PHOTOS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className='h-px w-screen bg-black opacity-30 -mb-15' />
        </View>
        <View className='h-[80%] flex flex-col justify-center m-3'>
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
              <Text className='font-antipasto text-sm text-left text-xl  font-antipasto opacity-100'>
                Titre :
              </Text>
            </View>
            <TextInput
              style={{ height: 40, width: 240, fontSize: 15 }}
              value={titre}
              onChangeText={setTitre}
              placeholder='ex: Monstera avec pot...'
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
                Décris ta pante :
              </Text>
            </View>
            <TextInput
              style={{ height: 80, width: 240, fontSize: 15 }}
              value={description}
              onChangeText={setDescription}
              placeholder='ex: Hauteur de 1m60, plante d interieur, pas besoins de beaucoup de soleil...'
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
                Prix :
              </Text>
            </View>
            <TextInput
              style={{ height: 40, width: 240, fontSize: 15 }}
              value={prix}
              onChangeText={setPrix}
              placeholder='ex: 18 euros...'
            />
          </View>
          <View className='mt-5'>
            <FormControl w='3/4' maxW='300' isRequired isInvalid>
              <Select
                className='rounded-sm'
                selectedValue={categorie}
                minWidth='200'
                accessibilityLabel='Catégorie'
                placeholder=' Catégorie'
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size={3} />,
                }}
                mt={1}
                onValueChange={(itemValue) => setCategorie(itemValue)}
              >
                <Select.Item label='Tropicales' value='plantes' />
                <Select.Item label='Rares' value='plantes' />
                <Select.Item label='Potager' value='plantes' />
                <Select.Item label='Aromatiques' value='plantes' />
                <Select.Item label='Cactus' value='plantes' />
              </Select>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>
                veuillez faire une sélection!
              </FormControl.ErrorMessage>
            </FormControl>
          </View>
          <View>
            <FormControl w='3/4' maxW='300' isRequired isInvalid>
              <Select
                selectedValue={etat}
                minWidth='200'
                accessibilityLabel='Etat'
                placeholder='Etat'
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size={5} />,
                }}
                mt={1}
                onValueChange={(itemValue) => setEtat(itemValue)}
              >
                <Select.Item label='excellent' value='plantes' />
                <Select.Item label='correcte' value='plantes' />
                <Select.Item label='mauvais état' value='plantes' />
              </Select>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>
                veuillez faire une sélection!
              </FormControl.ErrorMessage>
            </FormControl>
            <View className='flex items-center mt-10 mb-10'>
              <View
                style={{
                  height: 40,
                  width: 200,
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
                  shadowRadius: 16.1,
                }}
              >
                <TouchableOpacity
                  className='h-40 w-200 rounded-25 bg-ccedcf flex items-center justify-center shadow-lg hover:shadow-xl'
                  onPress={console.log('ajouter')}
                >
                  <Text className='font-antipasto text-black text-lg font-bold'>AJOUTER</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default AddScreen;
