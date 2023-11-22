import React, { useState, useCallback, useEffect } from 'react'

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from 'react-native'

import { plantOfferVar, updatePlantOffer, PlantOffer } from '../../variables/plantOffer'
import { useReactiveVar } from '@apollo/client'
import { ChevronLeftIcon, PhotoIcon, CameraIcon } from 'react-native-heroicons/solid'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import GradientTitle from '../../components/GradientTitle/GradientTitle'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import * as ImagePicker from 'expo-image-picker'

import { Input, TextArea, Image, Modal, Spinner, Button, useToast } from 'native-base'

import { LinearGradient } from 'expo-linear-gradient'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ConnectModal from '../../components/ConnectModal/ConnectModal'
import MainButton from '../../components/Buttons/MainButton'

interface AddNewOfferStep2ScreenProps {}
//
const AddNewOfferStep2Screen: React.FunctionComponent<AddNewOfferStep2ScreenProps> = (props) => {
  const { width, height } = useWindowDimensions()
  const [isLoaderOpen, setIsLoaderOpen] = useState<boolean | void | undefined>(false)
  const [showModal, setShowModal] = useState(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const toast = useToast()
  const IOS_TAB_BAR_HEIGHT = 80
  const ANDROID_TAB_BAR_HEIGHT = 47
  const existingPlantOffer: PlantOffer = useReactiveVar(plantOfferVar)
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
  const navigateToScreen3 = () => navigation.replace('AddNewOfferStep3Screen')
  const addImage = async () => {
    if (existingPlantOffer.pictures.length < 3) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
      }).then((image) => {
        // console.log('image', image);
        if (image.canceled) {
          return
        }
        if (!image.canceled) {
          // console.log('image.assets', image.assets)
          setIsLoaderOpen(true)
          const data = new FormData()
          const source = {
            uri: image.assets[0].uri,
            type: 'image/jpeg',
            name: 'newPic',
          }
          data.append('file', source)
          data.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
          data.append('cloud_name', process.env.CLOUDINARY_CLOUD_NAME)
          fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: 'post',
              body: data,
            },
          )
            .then((res) => res.json())
            .then(async (data) => {
              console.log('📸data.secure_url', data.secure_url)

              updatePlantOffer('pictures', [...existingPlantOffer.pictures, data.secure_url])
              setIsLoaderOpen(false)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    } else {
      toast.show({
        title: 'Vous pouvez ajouter 3 images maximum.',
      })
    }
  }

  function handleDeleteImage(index) {
    const newImagesUrlsAfterDeletion = [...existingPlantOffer.pictures]
    newImagesUrlsAfterDeletion.splice(index, 1)
    updatePlantOffer('pictures', newImagesUrlsAfterDeletion)
  }

  const openModalHandler = (imageUrl: string) => {
    setPreviewImage(imageUrl)
    setShowModal(true)
  }

  if (!isFocused) {
    return null
  }
  return (
    <LinearGradient colors={['#A0C7AC', 'white']} className='min-h-screen w-screen flex-1'>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
        >
          <View className='w-screen h-full items-center '>
            <View className='w-[95%]  bg-white rounded-md  shadow py-2 pl-2 mt-1 '>
              <View className='flex flex-row justify-between items-center '>
                <TouchableOpacity
                  className=' rounded-md flex items-center justify-center mr-1'
                  onPress={() => navigation.goBack()}
                >
                  <ChevronLeftIcon color={'#A0C7AC'} className='text-lg' />

                  {/* <Text className='text-darkleaf text-lg font-manropeBold'>Précédent</Text> */}
                </TouchableOpacity>
                <GradientTitle title='Ajouter des photos' align='left' />
                <View className=' rounded-md flex items-center justify-center mr-1 opacity-0'>
                  <ChevronLeftIcon color={'#A0C7AC'} className='text-lg' />

                  {/* <Text className='text-darkleaf text-lg font-manropeBold'>Précédent</Text> */}
                </View>
              </View>
            </View>

            <View className='bg-white w-[95%] justify-evenly rounded-lg shadow pt-3 mt-4 pb-3.5 px-3'>
              <Text
                className='font-semibold mb-3 text-sm text-center'
                style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
              >
                Mettez en valeur votre plante ! Une bonne lumière, un bon cadrage vous permettront
                d'attirer l'oeil de potentiels acheteurs !
              </Text>
              <View className='flex flex-row justify-around'>
                <TouchableOpacity
                  className=' rounded-md flex items-center justify-center bg-white shadow-lg px-2 py-1 mb-2 border-0 border-darkleaf'
                  style={{ width: 0.4 * width, height: 0.3 * width }}
                  onPress={addImage}
                >
                  <FontAwesome5Icon name={'images'} size={28} color={'#A0C7AC'} />

                  {/* <PhotoIcon color={'#A0C7AC'} size={32} /> */}
                  <Text className='text-darkleaf text-sm font-manrope'>
                    À partir de la bibliothèque
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=' rounded-md flex items-center justify-center bg-white shadow-lg px-2 py-1 border-0 border-darkleaf'
                  style={{ width: 0.4 * width, height: 0.3 * width }}
                  onPress={() => navigation.navigate('CameraScreen')}
                >
                  <CameraIcon color={'#A0C7AC'} size={32} />
                  <Text className='text-darkleaf text-sm font-manrope'>Prendre une photo</Text>
                </TouchableOpacity>
              </View>
            </View>
            {existingPlantOffer.pictures.length > 0 && (
              <View className='flex flex-row  justify-evenly  w-[95%] mt-4 bg-white py-3 shadow-lg rounded-md'>
                {existingPlantOffer.pictures.map((imageUrl: string, index) => {
                  return (
                    <View key={index} className='relative shadow-lg'>
                      <TouchableOpacity onPress={() => openModalHandler(imageUrl)}>
                        <Image
                          key={index}
                          alt='image'
                          className='rounded-md'
                          width={width * 0.28}
                          height={width * 0.4}
                          resizeMode='cover'
                          source={{
                            uri: imageUrl,
                          }}
                        />
                        {showModal && (
                          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <Modal.Content maxWidth='500px' style={{ backgroundColor: '#f2fff3' }}>
                              <Modal.CloseButton />

                              <Modal.Body>
                                <Image
                                  key={index}
                                  alt='image'
                                  className='rounded-md mr-2'
                                  width={400}
                                  height={400}
                                  resizeMode='cover'
                                  source={{
                                    uri: previewImage,
                                  }}
                                />

                                <TouchableOpacity
                                  className='mt-2 rounded-md flex items-center justify-center bg-white shadow-lg px-2 py-1 border-2 border-darkleaf'
                                  onPress={() => {
                                    setShowModal(false)
                                  }}
                                >
                                  <Text className='text-darkleaf text-sm font-manropeBold'>
                                    Fermer
                                  </Text>
                                </TouchableOpacity>
                              </Modal.Body>
                            </Modal.Content>
                          </Modal>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ position: 'absolute', top: 3, right: 6 }}
                        onPress={() => handleDeleteImage(index)}
                      >
                        <FontAwesomeIcon name={'trash'} size={20} color={'white'} />
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            )}

            <MainButton
              title='Continuer'
              action={navigateToScreen3}
              disabled={existingPlantOffer.pictures.length == 0}
            />
          </View>

          {/* {Platform.OS === 'android' && <View className='h-32'></View>} */}

          <SignedOut>
            <ConnectModal />
          </SignedOut>
        </KeyboardAwareScrollView>
        <View
          className='bg-white  w-full  flex flex-col'
          style={{
            position: 'absolute',
            bottom: Platform.OS == 'ios' ? IOS_TAB_BAR_HEIGHT : ANDROID_TAB_BAR_HEIGHT,
          }}
        >
          <View className='bg-darkleaf min-h-[2] w-2/5 rounded-br-lg rounded-tr-lg'></View>
          <View className='flex flex-row justify-end items-end'></View>
        </View>
        {/* Image Upload Loader Modal */}
        <Modal isOpen={isLoaderOpen} safeAreaTop={true}>
          <Modal.Content maxWidth='350' style={{ backgroundColor: '#f2fff3' }}>
            <Modal.Body>
              <Spinner size='lg' color='emerald.500' accessibilityLabel='Loading image' />
              <Text
                className='font-semibold mb-3 text-sm text-center'
                style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
              >
                Envoi de l'image en cours ...
              </Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  )
}
export default AddNewOfferStep2Screen
