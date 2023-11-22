import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import { useIsFocused, useNavigation, useNavigationState } from '@react-navigation/native'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
} from 'react-native'
// Font awesome no expo
import { userDataVar, updateUserData, UserData } from '../../variables/userData'
import { tempImageVar } from '../../variables/tempImage'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { ChevronDownIcon } from 'react-native-heroicons/solid'
import { Button, Image, Spinner } from 'native-base'
import { plantOfferVar, updatePlantOffer, PlantOffer } from '../../variables/plantOffer'
import { useReactiveVar } from '@apollo/client'
import { useUpdateUserProfileMutation } from '../../graphql/graphql'
import { useToast } from 'native-base'

export default function CameraScreen() {
  const toast = useToast()

  const { width } = useWindowDimensions()
  const camRef = useRef(null)
  const navigation = useNavigation()
  const existingPlantOffer: PlantOffer = useReactiveVar(plantOfferVar)
  const isFocused = useIsFocused()
  const [isLoaderOpen, setIsLoaderOpen] = useState(false)

  const [hasPermission, setHasPermission] = useState(null)
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [open, setOpen] = useState(false)
  const [flashMode, setFlashMode] = useState(false)
  const [updateProfile] = useUpdateUserProfileMutation()

  //* récupération de l'écran précédent pour determiner ce qu'on va faire de la photo
  const navigationState = useNavigationState((state) => state)
  let previousRouteName = ''
  if (navigationState.routes.length > 1) {
    const previousRouteIndex = navigationState.index - 1
    previousRouteName = navigationState.routes[previousRouteIndex].name
  }
  console.log('Previous screen name:', previousRouteName)
  const [type, setType] = useState(
    previousRouteName == 'AddNewOfferStep2Screen' || previousRouteName == 'ChatScreen'
      ? Camera.Constants.Type.back
      : Camera.Constants.Type.front,
  )
  //***** */
  console.log('captured', capturedPhoto)
  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()

      setHasPermission(status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    if (camRef) {
      const data = await camRef.current.takePictureAsync({ quality: 0.3 })
      setOpen(true)
      setCapturedPhoto(data.uri)
      // console.log(data);
    }
  }
  const updateAvatar = async (imgUrl: string) => {
    const response = await updateProfile({
      variables: {
        avatarUrl: imgUrl,
      },
    })
    if (response.data) {
      updateUserData('avatar', response.data?.updateUserProfile.avatar)
      updateUserData('avatarThumbnail', response.data?.updateUserProfile.avatarThumbnail)
      toast.show({
        title: '🌱 Votre avatar a été mis à jour avec succès !',
        placement: 'top',
      })
    }
  }
  const savePicture = () => {
    console.log('photo à envoyer', capturedPhoto)
    setIsLoaderOpen(true)
    const data = new FormData()
    const source = {
      uri: capturedPhoto,
      type: 'image/jpeg',
      name: 'newPic',
    }
    data.append('file', source)
    data.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
    data.append('cloud_name', process.env.CLOUDINARY_CLOUD_NAME)
    fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log('📸data.secure_url', data.secure_url)

        //* en fonction de l'écran précédent

        if (previousRouteName == 'AddNewOfferStep2Screen') {
          updatePlantOffer('pictures', [...existingPlantOffer.pictures, data.secure_url])
        } else if (previousRouteName == 'ChatScreen') {
          tempImageVar(data.secure_url)
        } else {
          updateAvatar(data.secure_url)
        }

        setIsLoaderOpen(false)
        navigation.pop()
      })
      .catch((err) => {
        console.log(err)
      })
    setOpen(false)
  }

  const deletePicture = () => {
    setOpen(false)
  }
  if (hasPermission === null) {
    return <View />
  }

  if (hasPermission === false) {
    return <Text>Accès à la caméra refusé.</Text>
  }
  if (!isFocused) {
    return null
  }
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={camRef}
        flashMode={!flashMode ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.torch}
      >
        <View style={styles.contentButton}>
          <TouchableOpacity style={styles.buttonClose} onPress={() => navigation.pop()}>
            <ChevronDownIcon color={'#A0C7AC'} className='h-6 w-6 pr-2' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() =>
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              )
            }
          >
            <FontAwesome name='exchange' size={23} color='#A0C7AC' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonFlashlight}
            onPress={() => setFlashMode(!flashMode)}
          >
            <Ionicons name='flashlight' size={23} color='#A0C7AC' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
            <FontAwesome name='camera' size={23} color='white' />
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal visible={open} onRequestClose={() => setOpen(false)} transparent={true}>
        <View className='w-4/5 my-auto mx-auto bg-white p-3 rounded-md'>
          <Image
            alt='image'
            width={width * 0.8}
            height={width * 0.9}
            className='rounded-md mr-2'
            resizeMode='cover'
            source={{
              uri: capturedPhoto,
            }}
          />
          <TouchableOpacity
            className='mt-2 rounded-md flex items-center justify-center bg-white shadow-lg px-2 py-1 border-2 border-darkleaf'
            onPress={() => {
              deletePicture()
            }}
          >
            <Text className='text-darkleaf text-sm font-manropeBold'>Reprendre la photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='mt-2 rounded-md flex items-center justify-center bg-darkleaf shadow-lg px-2 py-1 border-2 border-darkleaf'
            onPress={() => {
              savePicture()
            }}
          >
            <Text className='text-white text-sm font-manropeBold'>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={isLoaderOpen} transparent={true}>
        <View className='w-4/5 my-auto mx-auto bg-white p-3 rounded-md'>
          <Spinner size='lg' color='emerald.500' accessibilityLabel='Loading image' />
          <Text
            className='font-semibold mb-3 text-sm text-center'
            style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
          >
            Enregistrement de l'image en cours ...
          </Text>
        </View>
      </Modal>
      {/* <Modal isOpen={isLoaderOpen} safeAreaTop={true}>
        <Modal.Content maxWidth='350' style={{ backgroundColor: '#f2fff3' }}>
          <Modal.Body>
            <Spinner size='lg' color='emerald.500' accessibilityLabel='Loading image' />
            <Text
              className='font-semibold mb-3 text-sm text-center'
              style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
            >
              Enregistrement de l'image en cours ...
            </Text>
          </Modal.Body>
        </Modal.Content>
      </Modal> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  contentButton: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  buttonClose: {
    position: 'absolute',
    top: 17,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  buttonFlip: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  buttonFlashlight: {
    position: 'absolute',
    bottom: 120,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  buttonCamera: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A0C7AC',
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  contentModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 20,
  },
  imgPhoto: {
    width: '100%',
    height: 400,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 2,
    margin: 10,
  },
})
