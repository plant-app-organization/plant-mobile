import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import { useNavigation } from '@react-navigation/native'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
// Font awesome no expo
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import { ChevronDownIcon } from 'react-native-heroicons/solid'
import { Modal, Button, Image, Spinner } from 'native-base'
import { plantOfferVar, updatePlantOffer, PlantOffer } from '../../variables/plantOffer'
import { useReactiveVar } from '@apollo/client'
export default function CameraScreen() {
  const { width } = useWindowDimensions()
  const camRef = useRef(null)
  const navigation = useNavigation()
  const existingPlantOffer: PlantOffer = useReactiveVar(plantOfferVar)

  const [isLoaderOpen, setIsLoaderOpen] = useState(false)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHasPermission] = useState(null)
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [open, setOpen] = useState(false)
  const [flashMode, setFlashMode] = useState(false)
  console.log('captured', capturedPhoto)
  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()

      setHasPermission(status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    if (camRef) {
      const data = await camRef.current.takePictureAsync({ quality: 0.4 })
      setCapturedPhoto(data.uri)
      // console.log(data);
      setOpen(true)
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

        updatePlantOffer('pictures', [...existingPlantOffer.pictures, data.secure_url])
        setIsLoaderOpen(false)
        navigation.goBack()
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
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={camRef}
        flashMode={!flashMode ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.torch}
      >
        <View style={styles.contentButton}>
          <TouchableOpacity style={styles.buttonClose} onPress={() => navigation.goBack()}>
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
      {capturedPhoto && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <Modal.Content maxWidth='500px' style={{ backgroundColor: '#f2fff3' }}>
            <Modal.Body>
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
            </Modal.Body>
          </Modal.Content>
        </Modal>
      )}
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
