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

import { Avatar, Modal, Badge, Spinner, useToast } from 'native-base'
import { ChevronLeftIcon, PhotoIcon, CameraIcon } from 'react-native-heroicons/solid'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { plantOfferVar, updatePlantOffer, PlantOffer } from '../../variables/plantOffer'
import { userDataVar, updateUserData, UserData } from '../../variables/userData'

import { useReactiveVar } from '@apollo/client'
import { CheckCircleIcon } from 'react-native-heroicons/solid'
import MainButton from '../../components/Buttons/MainButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import GradientTitle from '../../components/GradientTitle/GradientTitle'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Input, TextArea } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ConnectModal from '../../components/ConnectModal/ConnectModal'
import { useUpdateUserProfileMutation, useGetMyUserDataQuery } from '../../graphql/graphql'
interface EditProfileScreenProps {}
//
const EditProfileScreen: React.FunctionComponent<EditProfileScreenProps> = (props) => {
  const userDataInDevice = useReactiveVar(userDataVar)

  const toast = useToast()
  const { isSignedIn, user, updateUser } = useUser()
  const { data: userData, loading, error } = useGetMyUserDataQuery()
  const { width } = useWindowDimensions()
  const isFocused = useIsFocused()
  const [isLoaderOpen, setIsLoaderOpen] = useState<boolean | void | undefined>(false)
  // console.log('🔥🔥🔥🔥🔥🔥🔥userData in EditProfileScreen', userData)

  const navigation = useNavigation()
  const existingPlantOffer: PlantOffer = useReactiveVar(plantOfferVar)
  const [updateProfile, { loading: updateProfileMutationLoading, error: updateProfileError }] =
    useUpdateUserProfileMutation()
  const [newBio, setNewBio] = useState<string | undefined>('')
  const navigateToScreen2 = () => navigation.navigate('AddNewOfferStep2Screen')

  const handleDescriptionChange = useCallback((value: string) => {
    updatePlantOffer('description', value)
  }, [])
  useEffect(() => {
    console.log('isFocused', isFocused)
    console.log('newBio', newBio)
  }, [isFocused])
  const handleTitleChange = useCallback((value: string) => {
    updatePlantOffer('plantName', value)
  }, [])
  const uploadFromCameraRoll = async () => {
    console.log('cameraroll')
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.2,
      aspect: [1, 1],
    }).then((image) => {
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
          name: 'newAvatar',
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
            const response = await updateProfile({
              variables: {
                avatarUrl: data.secure_url,
              },
            })
            console.log('response updateUser', response)
            if (response.data) {
              toast.show({
                title: '🌱 Votre avatar a été mis à jour avec succès !',
                placement: 'top',
              })
              updateUserData('avatar', response.data?.updateUserProfile.avatar)
              updateUserData('avatarThumbnail', response.data?.updateUserProfile.avatarThumbnail)
            } else {
              toast.show({
                title: 'Erreur',
                placement: 'top',
              })
            }

            setIsLoaderOpen(false)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  const saveChanges = async () => {
    const response = await updateProfile({
      variables: {
        bio: newBio,
      },
    })
    setNewBio('')

    // console.log('response de update', response)
    if (response.data) {
      updateUserData('bio', response.data?.updateUserProfile.userBio)
      toast.show({
        title: '🌱 Votre bio a été mise à jour avec succès !',
        placement: 'bottom',
      })
      console.log(
        'après enregistrement',
        'newBio',
        newBio,
        'userDataInDevice.bio',
        userDataInDevice.bio,
      )
    }
  }
  // console.log('userDataInDevice.avatar', userDataInDevice.avatar)
  if (!isFocused) {
    return null
  }

  return (
    <LinearGradient colors={['#C0FFE7', 'white']} className='min-h-screen w-screen flex-1'>
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
          <View className='w-screen h-full items-center mb-40'>
            <View className='w-[95%] rounded-lg  shadow py-2 px-3 mt-4 bg-white '>
              <View className='flex flex-row justify-center items-center '>
                <TouchableOpacity
                  className=' rounded-md flex items-center justify-center mr-1'
                  onPress={() => navigation.pop()}
                >
                  <ChevronLeftIcon color={'#A0C7AC'} className='text-lg' />

                  {/* <Text className='text-darkleaf text-lg font-manropeBold'>Précédent</Text> */}
                </TouchableOpacity>
                <GradientTitle title='Éditez votre profil' align='center' />
              </View>
            </View>

            <View className='w-[95%] bg-white justify-around rounded-lg shadow mt-4 px-3 py-3'>
              <Text
                className='font-semibold mb-1 text-lg'
                style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
              >
                {user?.username}
              </Text>
              <Text
                className=' mb-1 text-md'
                style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
              >
                {user?.emailAddresses[0].emailAddress}
              </Text>
              <Text className='text-xs mb-0' style={{ fontFamily: 'manrope', color: '#7994b7' }}>
                Votre pseudo et adresse email ne sont pas modifiables.
              </Text>
            </View>
            <View className='w-[95%] bg-white items-center justify-around rounded-lg shadow mt-4 flex flex-row px-3 py-3'>
              <Avatar
                bg='warmGray.50'
                source={{
                  uri: userDataInDevice.avatar,
                }}
                size='lg'
              ></Avatar>
              <View className='flex flex-col justify-around items-start'>
                <TouchableOpacity
                  className=' rounded-md flex flex-row items-between  bg-white shadow-lg px-2 py-1  border-0 border-darkleaf'
                  style={{ width: '100%' }}
                  onPress={uploadFromCameraRoll}
                >
                  <FontAwesome5Icon name={'images'} size={22} color={'#A0C7AC'} />

                  {/* <PhotoIcon color={'#A0C7AC'} size={32} /> */}
                  <Text className='text-darkleaf text-sm font-manrope ml-2'>
                    À partir de la bibliothèque
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=' rounded-md flex flex-row items-center justify-start bg-white shadow-lg px-2 py-1 border-0 border-darkleaf mt-2'
                  style={{ width: '100%' }}
                  onPress={() => navigation.navigate('CameraScreen')}
                >
                  <CameraIcon color={'#A0C7AC'} size={24} />
                  <Text className='text-darkleaf text-sm font-manrope ml-2'>Prendre une photo</Text>
                </TouchableOpacity>
              </View>

              {/* 
              <View className='py-5 w-[80%] items-center'>
                <Text className='font-semibold text-base'>
                  Hauteur: {Math.floor(plantHeight).toString()} cm
                </Text>
              </View>

              <View className='w-[80%] py-5 items-center'></View> */}
            </View>

            <View className='w-[95%] bg-white  items-center justify-around rounded-lg shadow mt-4'>
              <View className='py-5 px-3'>
                <Text
                  className='font-semibold mb-1 text-lg'
                  style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
                >
                  Votre bio
                </Text>
                <Text className='text-xs mb-2' style={{ fontFamily: 'manrope', color: '#7994b7' }}>
                  Donnez vie à votre profil ! Votre bio est l'occasion idéale de vous exprimer et de
                  partager un peu de votre univers avec la communauté. Que vous soyez un jardinier
                  passionné, un amoureux des plantes, ou simplement quelqu'un avec une histoire
                  unique à raconter, votre bio est l'endroit parfait pour le faire savoir. 🌿🌱
                </Text>
                <Text
                  className='text-xs text-right mb-1'
                  style={{ fontFamily: 'manrope', color: '#7994b7' }}
                >
                  {newBio !== '' && newBio !== userData?.userData.userBio && `${newBio.length}/500`}
                  {newBio !== userData?.userData.userBio && newBio.length > 20 ? (
                    <FontAwesomeIcon name='check' size={16} color={'#A0C7AC'} />
                  ) : null}
                </Text>
                <TextArea
                  multiline={true}
                  //   returnKeyType='done'
                  blurOnSubmit={true}
                  h={220}
                  color='#73859e'
                  maxLength={500}
                  fontWeight={'bold'}
                  value={newBio}
                  onChangeText={(value) => setNewBio(value)}
                  placeholder={userDataInDevice.bio}
                  size='xl'
                  w='100%'
                  fontFamily={'manrope_bold'}
                  focusOutlineColor='#BFE6CB'
                  outlineColor={'white'}
                  backgroundColor={'#F5F5F5'}
                  numberOfLines={15}
                  fontSize={15}
                  isDisabled={updateProfileMutationLoading}

                  // keyboardType='visible-password'
                />
              </View>
            </View>

            <MainButton
              title='Enregister les modifications'
              action={saveChanges}
              loading={updateProfileMutationLoading}
              disabled={
                userData?.userData.userBio == newBio ||
                newBio == '' ||
                newBio.length < 20 ||
                updateProfileMutationLoading
                  ? true
                  : false
              }
            />
          </View>

          <SignedOut>
            <ConnectModal />
          </SignedOut>
          {/* upload progress modal */}
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
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}
export default EditProfileScreen
