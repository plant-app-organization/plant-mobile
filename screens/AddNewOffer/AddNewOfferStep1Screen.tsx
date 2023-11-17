import React, { useState, useCallback, useEffect } from 'react'

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { plantOfferVar, updatePlantOffer, PlantOffer } from '../../variables/plantOffer'
import { useReactiveVar } from '@apollo/client'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import GradientTitle from '../../components/GradientTitle/GradientTitle'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import { Input, TextArea } from 'native-base'

import { LinearGradient } from 'expo-linear-gradient'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ConnectModal from '../../components/ConnectModal/ConnectModal'

interface AddNewOfferStep1ScreenProps {}
//
const AddNewOfferStep1Screen: React.FunctionComponent<AddNewOfferStep1ScreenProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState(null)
  const [regionName, setRegionName] = useState<string>('')
  const [postCode, setPostCode] = useState<string>('')
  const [location, setLocation] = useState(null)
  const [title, setTitle] = useState<string | null>(null)
  const [pot, setPot] = useState<boolean>(false)
  const [plantHeight, setPlantHeight] = useState<number>(0)
  const [description, setDescription] = useState<string | null>(null)
  const [price, setPrice] = useState<string>('')
  const isFocused = useIsFocused()
  const TAB_BAR_HEIGHT = 80
  const navigation = useNavigation()
  const existingPlantOffer: PlantOffer = useReactiveVar(plantOfferVar)
  console.log('existingPlantOffer', existingPlantOffer)

  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
  const onSelectLocation = (data, details) => {
    const addressComponents = details.address_components
    const postalCodeObject = addressComponents.find((component) =>
      component.types.includes('postal_code'),
    )
    const postalCode = postalCodeObject.long_name
    const regionObject = addressComponents.find((component) =>
      component.types.includes('administrative_area_level_1'),
    )
    const region = regionObject.long_name
    console.log('postalCode', postalCode)
    setPostCode(postalCode)
    setRegionName(region)
    setLocation({ ...data, ...details })
    // console.log('🤹data', data, '🔥details', details)
  }

  const handleDescriptionChange = useCallback((value: string) => {
    updatePlantOffer('description', value)
  }, [])

  const handleTitleChange = useCallback((value: string) => {
    updatePlantOffer('plantName', value)
  }, [])

  const handleToggle = () => {
    setPot(!pot)
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
          <View className='w-screen h-full items-center '>
            <View className='w-[95%] rounded-lg  shadow py-2 px-3 mt-4 bg-white'>
              <View className='flex flex-row justify-center items-center '>
                <GradientTitle title='Vendez votre plante' align='center' />
              </View>
            </View>

            <View className='w-[95%] bg-white  items-center justify-around rounded-lg shadow mt-4'>
              <View className='py-5 px-3'>
                <Text
                  className='font-semibold mb-0 text-lg'
                  style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
                >
                  Quel est le titre de votre annonce ?
                </Text>
                <Text className='text-xs mb-2' style={{ fontFamily: 'manrope', color: '#7994b7' }}>
                  Choisissez un titre explicite et accrocheur pour garantir que votre annonce capte
                  l'intérêt de vos futurs acheteurs !
                </Text>
                <Input
                  variant='outline'
                  value={existingPlantOffer.plantName}
                  onChangeText={handleTitleChange}
                  placeholder='Titre'
                  size='xl'
                  fontSize={15}
                  w='100%'
                  focusOutlineColor='#BFE6CB'
                  autoFocus={false}
                  outlineColor={'#73859e'}
                  color='black'
                  backgroundColor={'#F5F5F5'}
                  keyboardType='visible-password'
                />
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
                  Comment décririez-vous votre plante ?
                </Text>
                <Text className='text-xs mb-2' style={{ fontFamily: 'manrope', color: '#7994b7' }}>
                  Fournissez tous les détails : partagez l'histoire unique de votre plante, décrivez
                  son état de santé actuel et laissez libre cours à votre créativité !{' '}
                </Text>
                <TextArea
                  multiline={true}
                  //   returnKeyType='done'
                  blurOnSubmit={true}
                  h={40}
                  value={plantOfferVar().description}
                  onChangeText={handleDescriptionChange}
                  placeholder='Description'
                  size='xl'
                  w='100%'
                  focusOutlineColor='#BFE6CB'
                  color='black'
                  outlineColor={'white'}
                  backgroundColor={'#F5F5F5'}
                  fontSize={15}
                  keyboardType='visible-password'
                />
              </View>
            </View>
          </View>

          <SignedOut>
            <ConnectModal />
          </SignedOut>
        </KeyboardAwareScrollView>

        <View
          className='bg-white  w-full  flex flex-col'
          style={{ position: 'absolute', bottom: TAB_BAR_HEIGHT }}
        >
          {existingPlantOffer.description &&
            existingPlantOffer.plantName &&
            existingPlantOffer.description.length > 10 &&
            existingPlantOffer.plantName.length > 5 && (
              <TouchableOpacity
                className=' rounded-md flex items-center justify-center mb-2 bg-darkleaf shadow-lg px-2 py-1 border-2 border-darkleaf'
                onPress={() => navigation.navigate('AddNewOfferStep2Screen')}
              >
                <Text className='text-white text-lg font-manropeBold'>Continuer</Text>
              </TouchableOpacity>
            )}
          <View className='bg-darkleaf min-h-[4] w-1/4 rounded-br-lg rounded-tr-lg'></View>
          <View className='flex flex-row justify-end items-end'></View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
export default AddNewOfferStep1Screen
