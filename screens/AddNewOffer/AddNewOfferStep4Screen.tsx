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
import { Slider } from '@miblanchard/react-native-slider'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import GradientTitle from '../../components/GradientTitle/GradientTitle'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'

import { plantOfferVar, updatePlantOffer, PlantOffer } from '../../variables/plantOffer'
import { useReactiveVar } from '@apollo/client'
import { Input, TextArea } from 'native-base'

import { LinearGradient } from 'expo-linear-gradient'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ConnectModal from '../../components/ConnectModal/ConnectModal'
import MainButton from '../../components/Buttons/MainButton'
import { formatPrice, formatPriceToNumber } from '../../lib/formatPrice'
interface AddNewOfferStep4ScreenProps {}
//
const AddNewOfferStep4Screen: React.FunctionComponent<AddNewOfferStep4ScreenProps> = (props) => {
  const existingPlantOffer: PlantOffer = useReactiveVar(plantOfferVar)
  const [searchQuery, setSearchQuery] = useState(null)
  const [regionName, setRegionName] = useState<string>('')
  const [postCode, setPostCode] = useState<string>('')
  const [location, setLocation] = useState(null)
  const [title, setTitle] = useState<string>('')
  const [pot, setPot] = useState<boolean>(existingPlantOffer.pot)
  const { width } = useWindowDimensions()
  const IOS_TAB_BAR_HEIGHT = 80
  const ANDROID_TAB_BAR_HEIGHT = 47
  const [plantHeight, setPlantHeight] = useState<number>(existingPlantOffer.plantHeight)
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const isFocused = useIsFocused()
  const TAB_BAR_HEIGHT = 80
  const navigation = useNavigation()
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

  const saveDataAndNavigate = () => {
    updatePlantOffer('price', formatPriceToNumber(price))
    updatePlantOffer('pot', pot)
    updatePlantOffer('plantHeight', plantHeight)
    navigation.navigate('AddNewOfferStep5Screen')
  }
  useEffect(() => {
    existingPlantOffer.price != 0 && setPrice(formatPrice(existingPlantOffer.price.toString()))
  }, [])

  const handleToggle = () => {
    setPot(!pot)
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
                <GradientTitle title='On y est presque !' align='left' />
                <View className=' rounded-md flex items-center justify-center mr-1 opacity-0'>
                  <ChevronLeftIcon color={'#A0C7AC'} className='text-lg' />

                  {/* <Text className='text-darkleaf text-lg font-manropeBold'>Précédent</Text> */}
                </View>
              </View>
            </View>

            <View className='bg-white w-[95%] justify-evenly items-start rounded-lg shadow pt-3 mt-4 pb-3.5 px-3'>
              <Text
                className='font-semibold mb-3 text-lg'
                style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
              >
                Quel est votre prix ?
              </Text>
              <Input
                autoFocus={false}
                outlineColor={'#73859e'}
                isFullWidth={false}
                width={width * 0.3}
                focusOutlineColor={'#A0C7AC'}
                style={{
                  fontSize: 18,
                  backgroundColor: '#F5F5F5',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 4,
                  fontFamily: 'manrope',
                  color: '#73859e',
                  fontWeight: 'bold',
                }}
                value={price}
                onChangeText={(value) => setPrice(value)}
                keyboardType='numeric'
                placeholder='0,00 €'
                // onEndEditing={() => setPrice(formatPrice(price))}
                onBlur={() => setPrice(formatPrice(price))}
                // onPressOut={() => setPrice(formatPrice(price))}
                returnKeyType='done'
              />
            </View>

            <View className='w-[95%] bg-white justify-around rounded-lg shadow mt-4 px-3 py-3'>
              <Text
                className='font-semibold mb-0 text-lg text-left'
                style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
              >
                Fournissez-vous des accessoires avec la plante ?
              </Text>
              <Text className='text-xs mb-2' style={{ fontFamily: 'manrope', color: '#7994b7' }}>
                Pensez à faire apparaître les éventuels accessoires sur une photo.
              </Text>
              <View className='flex flex-row justify-start items-center  w-full'>
                <TouchableOpacity
                  onPress={handleToggle}
                  className='w-6/12 flex flex-row items-center justify-start'
                >
                  <FontAwesomeIcon
                    name={!pot ? 'check-square' : 'square-o'}
                    size={24}
                    color={!pot ? '#A0C7AC' : '#A0C7AC'}
                    className='mr-3'
                  />
                  <Text
                    className='font-semibold text-md text-left'
                    style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
                  >
                    Cache-pot
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View className='py-5 w-[80%] items-center'>
                <Text className='font-semibold text-base'>
                  Hauteur: {Math.floor(plantHeight).toString()} cm
                </Text>
              </View> */}
            </View>
            <View className='w-[95%] bg-white justify-around rounded-lg shadow mt-4 px-3 py-3'>
              <Text
                className='font-semibold mb-0 text-lg text-left'
                style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
              >
                Quelle est la taille de votre plante ?
              </Text>
              <Text className='text-xs mb-2' style={{ fontFamily: 'manrope', color: '#7994b7' }}>
                Si vous ne connaissez pas la taille exacte, vous pouvez entrer une taille
                approximative. Cela donnera une idée aux potentiels acheteurs.
              </Text>
              <View className='py-0  items-start mx-auto'>
                <Text
                  className='font-semibold text-md text-center'
                  style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
                >
                  Hauteur: {plantHeight.toString()} cm
                </Text>
              </View>
              <Slider
                value={plantHeight}
                minimumValue={0}
                maximumValue={300}
                trackStyle={{
                  backgroundColor: '#BFE6CB',
                }}
                containerStyle={{
                  width: '90%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                thumbStyle={{ backgroundColor: '#A0C7AC' }}
                minimumTrackStyle={{ backgroundColor: '#A0C7AC' }}
                maximumTrackStyle={{ backgroundColor: '#e0e0e0' }}
                onValueChange={(value) => setPlantHeight(Math.floor(value))}
              />
            </View>
            {formatPriceToNumber(price) > 0 && plantHeight > 0 && (
              <MainButton title='Continuer' action={saveDataAndNavigate} />
            )}
          </View>

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
          <View className='bg-darkleaf min-h-[2] w-4/5 rounded-br-lg rounded-tr-lg'></View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
export default AddNewOfferStep4Screen
