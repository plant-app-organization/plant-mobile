import React, { useState } from 'react'

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { SignedOut } from '@clerk/clerk-expo'
import GradientTitle from '../../components/GradientTitle/GradientTitle'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { ChevronLeftIcon, CheckIcon } from 'react-native-heroicons/solid'

import { plantOfferVar, updatePlantOffer, PlantOffer } from '../../variables/plantOffer'
import { useReactiveVar } from '@apollo/client'
import { Input, TextArea, FormControl, Select } from 'native-base'

import { LinearGradient } from 'expo-linear-gradient'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ConnectModal from '../../components/ConnectModal/ConnectModal'
import MainButton from '../../components/Buttons/MainButton'

interface AddNewOfferStep3ScreenProps {}
//
const AddNewOfferStep3Screen: React.FunctionComponent<AddNewOfferStep3ScreenProps> = (props) => {
  const [pot, setPot] = useState<boolean>(false)

  const IOS_TAB_BAR_HEIGHT = 80
  const ANDROID_TAB_BAR_HEIGHT = 47

  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
  const navigateToScreen4 = () => navigation.navigate('AddNewOfferStep4Screen')
  const existingPlantOffer: PlantOffer = useReactiveVar(plantOfferVar)

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
    // console.log('postalCode', postalCode)
    updatePlantOffer('postcode', postalCode)
    updatePlantOffer('region', region)
    updatePlantOffer('city', details.vicinity)

    updatePlantOffer('location', details.formatted_address)
    updatePlantOffer('latitude', details.geometry.location.lat)
    updatePlantOffer('longitude', details.geometry.location.lng)
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
                <GradientTitle title='Dites-nous en plus' align='left' />
                <View className=' rounded-md flex items-center justify-center mr-1 opacity-0'>
                  <ChevronLeftIcon color={'#A0C7AC'} className='text-lg' />

                  {/* <Text className='text-darkleaf text-lg font-manropeBold'>Précédent</Text> */}
                </View>
              </View>
            </View>

            <View className='bg-white w-[95%] justify-evenly rounded-lg shadow pt-3 mt-4 pb-3.5 px-3'>
              <Text
                className='font-semibold mb-3 text-sm'
                style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
              >
                À quelle adresse {'\n'}peut-on récupérer votre plante ?
              </Text>
              <Text
                className='text-xs text-right mb-1'
                style={{ fontFamily: 'manrope', color: '#7994b7' }}
              >
                {existingPlantOffer.city ? (
                  <FontAwesomeIcon name='check' size={16} color={'#A0C7AC'} />
                ) : null}
              </Text>

              <GooglePlacesAutocomplete
                placeholder='Adresse'
                keepResultsAfterBlur={true}
                onPress={(data, details = null) => {
                  // console.log('🤩data', data, 'details', details)
                  onSelectLocation(data, details)
                }}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'fr',
                  components: 'country:fr',
                }}
                fetchDetails={true}
                enablePoweredByContainer={false}
                onNotFound={() => console.log('no results')}
                // listEmptyComponent={() => (
                //   <View style={{ flex: 1 }}>
                //     <Text>Nous n'avons pas trouvé cette adresse</Text>
                //   </View>
                // )}
                textInputProps={{
                  underlineColorAndroid: 'rgba(0,0,0,0)',
                  placeholderTextColor: '#73859e',
                  autoFocus: false,

                  blurOnSubmit: false,
                  style: {
                    backgroundColor: '#F5F5F5',
                    width: '100%',
                    height: 40,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    fontSize: 15,
                    borderColor: `${!existingPlantOffer.latitude ? '#BFE6CB' : '#79acd8'}`,
                    borderWidth: 1,
                    fontFamily: 'manrope_bold',
                    color: '#73859e',
                    fontWeight: 'bold',
                  },
                }}
                styles={{
                  container: {
                    flex: 0,
                    width: '100%',
                    alignItems: 'center',
                  },
                  description: {
                    color: '#000',
                    fontSize: 15,
                  },
                  predefinedPlacesDescription: {
                    color: '#73859e',
                  },
                  separator: {
                    backgroundColor: '#A0C7AC',
                  },
                }}
              />
            </View>

            <View className='bg-white w-[95%] justify-evenly rounded-lg shadow pt-3 mt-4 pb-3.5 px-3'>
              <FormControl w='100%' isRequired className=' mb-10'>
                <Text
                  className='font-semibold mb-3 text-sm'
                  style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
                >
                  De quel type de plante s'agit-il ?
                </Text>

                <Select
                  selectedValue={existingPlantOffer.environment}
                  minWidth='200'
                  dropdownIcon={
                    existingPlantOffer.environment ? (
                      <FontAwesomeIcon
                        name='check'
                        size={16}
                        color={'#A0C7AC'}
                        style={{ marginRight: 10 }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        name='chevron-down'
                        size={16}
                        color={'#73859e'}
                        style={{ marginRight: 10 }}
                      />
                    )
                  }
                  accessibilityLabel='Environnement'
                  placeholder='Intérieur ou extérieur'
                  fontSize={16}
                  placeholderTextColor='#73859e'
                  fontWeight={'bold'}
                  backgroundColor={'#F5F5F5'}
                  color={'#73859e'}
                  _selectedItem={{
                    bg: '#6AB2DF',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  borderColor={'#BFE6CB'}
                  fontFamily={'manrope_bold'}
                  mt={1}
                  onValueChange={(itemValue) => updatePlantOffer('environment', itemValue)}
                >
                  <Select.Item label='Intérieur' value='indoor' />
                  <Select.Item label='Extérieur' value='outdoor' />
                  <Select.Item label='Intérieur & extérieur' value='both' />
                </Select>
              </FormControl>
              <FormControl w='100%' isRequired>
                <Select
                  className='rounded-sm'
                  dropdownIcon={
                    existingPlantOffer.category ? (
                      <FontAwesomeIcon
                        name='check'
                        size={16}
                        color={'#A0C7AC'}
                        style={{ marginRight: 10 }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        name='chevron-down'
                        size={16}
                        color={'#73859e'}
                        style={{ marginRight: 10 }}
                      />
                    )
                  }
                  selectedValue={existingPlantOffer.category}
                  fontWeight={'bold'}
                  minWidth='200'
                  accessibilityLabel='Catégorie'
                  backgroundColor={'#F5F5F5'}
                  placeholder=' Catégorie'
                  fontFamily={'manrope_bold'}
                  fontSize={16}
                  color={'#73859e'}
                  placeholderTextColor='#73859e'
                  _selectedItem={{
                    bg: '#6AB2DF',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  borderColor={'#BFE6CB'}
                  mt={1}
                  onValueChange={(itemValue) => updatePlantOffer('category', itemValue)}
                >
                  <Select.Item label='Tropicales' value='tropical' />
                  <Select.Item label='Rares' value='rare' />
                  <Select.Item label='Aromatiques' value='aromatic' />
                  <Select.Item label='Plantes du potager' value='kitchenGarden' />
                  <Select.Item label='Plantes grasses' value='succulent' />
                  <Select.Item label='Autre' value='autre' />
                </Select>
              </FormControl>

              <FormControl w='100%' isRequired className='mt-10 mb-10'>
                <Select
                  selectedValue={existingPlantOffer.health}
                  minWidth='200'
                  accessibilityLabel='Santé'
                  placeholder='État de santé'
                  dropdownIcon={
                    existingPlantOffer.health ? (
                      <FontAwesomeIcon
                        name='check'
                        size={16}
                        color={'#A0C7AC'}
                        style={{ marginRight: 10 }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        name='chevron-down'
                        size={16}
                        color={'#73859e'}
                        style={{ marginRight: 10 }}
                      />
                    )
                  }
                  fontSize={16}
                  color={'#73859e'}
                  fontFamily={'manrope_bold'}
                  fontWeight={'bold'}
                  backgroundColor={'#F5F5F5'}
                  placeholderTextColor='#73859e'
                  _selectedItem={{
                    bg: '#6AB2DF',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  borderColor={'#BFE6CB'}
                  mt={1}
                  onValueChange={(itemValue) => updatePlantOffer('health', itemValue)}
                >
                  <Select.Item label='Excellent' value='excellent' />
                  <Select.Item label='Bon' value='good' />
                  <Select.Item label='Correct' value='correct' />
                  <Select.Item label='Mauvais état' value='bad' />
                </Select>
              </FormControl>

              <FormControl w='100%' isRequired>
                <Select
                  selectedValue={existingPlantOffer.maintenanceDifficultyLevel}
                  minWidth='200'
                  fontWeight={'bold'}
                  dropdownIcon={
                    existingPlantOffer.maintenanceDifficultyLevel ? (
                      <FontAwesomeIcon
                        name='check'
                        size={16}
                        color={'#A0C7AC'}
                        style={{ marginRight: 10 }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        name='chevron-down'
                        size={16}
                        color={'#73859e'}
                        style={{ marginRight: 10 }}
                      />
                    )
                  }
                  accessibilityLabel='Entretien'
                  placeholder='Entretien'
                  fontFamily={'manrope_bold'}
                  backgroundColor={'#F5F5F5'}
                  fontSize={16}
                  color={'#73859e'}
                  borderColor={'#BFE6CB'}
                  placeholderTextColor='#73859e'
                  _selectedItem={{
                    bg: '#6AB2DF',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) =>
                    updatePlantOffer('maintenanceDifficultyLevel', itemValue)
                  }
                >
                  <Select.Item label='Facile' value='easy' fontFamily={'manrope_bold'} />
                  <Select.Item label='Intermédiaire' value='intermediary' />
                  <Select.Item label='Difficile' value='difficult' fontFamily={'manrope_bold'} />
                </Select>
              </FormControl>
            </View>

            <MainButton
              title='Continuer'
              action={navigateToScreen4}
              disabled={
                existingPlantOffer.city &&
                existingPlantOffer.health &&
                existingPlantOffer.category &&
                existingPlantOffer.maintenanceDifficultyLevel &&
                existingPlantOffer.environment
                  ? false
                  : true
              }
              loading={false}
            />
          </View>

          {Platform.OS === 'android' && <View className='h-32'></View>}
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
          <View className='bg-darkleaf min-h-[2] w-3/5 rounded-br-lg rounded-tr-lg'></View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
export default AddNewOfferStep3Screen
