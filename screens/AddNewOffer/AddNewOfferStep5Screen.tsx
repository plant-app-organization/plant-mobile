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
import ConfettiCannon from 'react-native-confetti-cannon'
import { useCreateNewOfferMutation } from '../../graphql/graphql'

import { Slider } from '@miblanchard/react-native-slider'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import GradientTitle from '../../components/GradientTitle/GradientTitle'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { ChevronLeftIcon, PencilSquareIcon } from 'react-native-heroicons/solid'
import ValidationView from '../../components/ValidationView/ValidationView'

import {
  plantOfferVar,
  updatePlantOffer,
  PlantOffer,
  resetPlantOffer,
} from '../../variables/plantOffer'
import { useReactiveVar } from '@apollo/client'
import { Input, TextArea, Image, Modal } from 'native-base'

import { LinearGradient } from 'expo-linear-gradient'
import ConnectModal from '../../components/ConnectModal/ConnectModal'
import MainButton from '../../components/Buttons/MainButton'
import { formatPrice, formatPriceToNumber } from '../../lib/formatPrice'
interface AddNewOfferStep5ScreenProps {}
//
const AddNewOfferStep5Screen: React.FunctionComponent<AddNewOfferStep5ScreenProps> = (props) => {
  const [shoot, setShoot] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState<boolean>(false)
  const { width } = useWindowDimensions()
  const IOS_TAB_BAR_HEIGHT = 80
  const ANDROID_TAB_BAR_HEIGHT = 47

  const isFocused = useIsFocused()

  const TAB_BAR_HEIGHT = 80
  const navigation = useNavigation()
  const [createNewOffer, { loading, error }] = useCreateNewOfferMutation()

  const onCreateNewOfferPress = async () => {
    // console.log('🧡requete!')
    const response = await createNewOffer({
      variables: {
        newOfferInput: {
          plantName: existingPlantOffer.plantName,
          description: existingPlantOffer.description,
          pictures: existingPlantOffer.pictures,
          price: existingPlantOffer.price,
          category: existingPlantOffer.category,
          environment: existingPlantOffer.environment,
          health: existingPlantOffer.health,
          pot: existingPlantOffer.pot,
          plantHeight: Math.floor(existingPlantOffer.plantHeight),
          maintenanceDifficultyLevel: existingPlantOffer.maintenanceDifficultyLevel,
          location: existingPlantOffer.location,
          latitude: existingPlantOffer.latitude,
          longitude: existingPlantOffer.longitude,
          city: existingPlantOffer.city,
          postcode: existingPlantOffer.postcode,
          region: existingPlantOffer.region,
        },
      },
    })
    // console.log('response', response)
    if (response) {
      setShoot(true)
      setTimeout(() => {
        setIsSuccessModalOpen(true)
      }, 1000)

      setTimeout(() => {
        navigation.navigate('Profile')
        resetPlantOffer()
        setIsSuccessModalOpen(false)
      }, 6000)
    }
  }
  const openModalHandler = (imageUrl: string) => {
    setPreviewImage(imageUrl)
    setShowModal(true)
  }
  const publishOffer = () => {
    onCreateNewOfferPress()
  }

  const existingPlantOffer: PlantOffer = useReactiveVar(plantOfferVar)
  console.log('🔥Existing Plant Offfer on screen 4', existingPlantOffer)

  const handleToggle = () => {
    setTermsAndConditionsAccepted(!termsAndConditionsAccepted)
  }
  if (!isFocused) {
    return null
  }
  return (
    <LinearGradient colors={['#FFE2C0', 'white']} className='min-h-screen w-screen flex-1'>
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
          <View className='w-screen h-full items-center mb-28'>
            <View className='w-[95%]  bg-white rounded-lg  shadow py-2 px-3 mt-4 '>
              <View className='flex flex-row justify-between items-center '>
                <TouchableOpacity
                  className=' rounded-md flex items-center justify-center mr-1'
                  onPress={() => navigation.goBack()}
                >
                  <ChevronLeftIcon color={'#A0C7AC'} className='text-lg' />

                  {/* <Text className='text-darkleaf text-lg font-manropeBold'>Précédent</Text> */}
                </TouchableOpacity>
                <GradientTitle title='Récapitulatif' align='left' />
                <View className=' rounded-md flex items-center justify-center mr-1 opacity-0'>
                  <ChevronLeftIcon color={'#A0C7AC'} className='text-lg' />

                  {/* <Text className='text-darkleaf text-lg font-manropeBold'>Précédent</Text> */}
                </View>
              </View>
            </View>

            <View className='w-[95%] bg-white justify-around rounded-lg shadow mt-4 px-3 py-3'>
              <View className='flex flex-row justify-between'>
                <Text
                  className='font-semibold mb-0 text-lg text-left'
                  style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
                >
                  {existingPlantOffer.plantName}
                </Text>
                <TouchableOpacity
                  className=' rounded-md flex items-center justify-center mr-1'
                  onPress={() => navigation.navigate('AddNewOfferStep1Screen')}
                >
                  <PencilSquareIcon color={'#A0C7AC'} className='text-lg' />

                  {/* <Text className='text-darkleaf text-lg font-manropeBold'>Précédent</Text> */}
                </TouchableOpacity>
              </View>
              <Text className='text-xs mb-2' style={{ fontFamily: 'manrope', color: '#7994b7' }}>
                {existingPlantOffer.description}
              </Text>
              <Text
                className='font-semibold mb-0 text-lg text-left text-darkleaf'
                style={{ fontFamily: 'manrope_bold' }}
              >
                {formatPrice(existingPlantOffer.price.toString())}
              </Text>
            </View>
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

                      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Content maxWidth='500px' style={{ backgroundColor: '#f2fff3' }}>
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
                              <Text className='text-darkleaf text-sm font-manropeBold'>Fermer</Text>
                            </TouchableOpacity>
                          </Modal.Body>
                        </Modal.Content>
                      </Modal>
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
            <View className='w-[95%] bg-white justify-around rounded-lg shadow mt-4 px-3 py-3'>
              <Text className='text-md mb-2' style={{ fontFamily: 'manrope', color: '#7994b7' }}>
                Une fois validée par notre équipe de modération, votre annonce sera en ligne pour 60
                jours. La publication de votre annonce vous sera notifiée par email.
              </Text>
              <View className='flex flex-row justify-start items-center  w-full'>
                <TouchableOpacity
                  onPress={handleToggle}
                  className='w-full flex flex-row items-center justify-start'
                >
                  <FontAwesomeIcon
                    name={termsAndConditionsAccepted ? 'check-square' : 'square-o'}
                    size={24}
                    color={!termsAndConditionsAccepted ? '#A0C7AC' : '#A0C7AC'}
                    className='mr-3'
                  />
                  <Text
                    className='font-semibold text-md text-left'
                    style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
                  >
                    J'accepte les conditions d'utilisation et la politique de confidentialité de
                    PlantB.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {!shoot && (
              <MainButton
                title='Publier'
                action={publishOffer}
                disabled={!termsAndConditionsAccepted || loading || isSuccessModalOpen}
                loading={loading}
              />
            )}
          </View>

          <SignedOut>
            <ConnectModal />
          </SignedOut>
        </KeyboardAwareScrollView>
        {shoot ? <ConfettiCannon fadeOut={true} count={300} origin={{ x: -10, y: 0 }} /> : null}
        <View
          className='bg-white  w-full  flex flex-col'
          style={{
            position: 'absolute',
            bottom: Platform.OS == 'ios' ? IOS_TAB_BAR_HEIGHT : ANDROID_TAB_BAR_HEIGHT,
          }}
        >
          <View className='bg-darkleaf min-h-[2] w-5/5 rounded-br-lg rounded-tr-lg'></View>
          <Modal
            isOpen={isSuccessModalOpen}
            onClose={() => {
              navigation.navigate('Home')
              setIsSuccessModalOpen(false)
            }}
            safeAreaTop={true}
          >
            <Modal.Content maxWidth='350' p={4}>
              <Text
                className='font-semibold text-md text-center'
                style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
              >
                Félicitations, votre offre a été soumise à notre équipe de modération !
              </Text>
              <ValidationView />
            </Modal.Content>
          </Modal>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
export default AddNewOfferStep5Screen
