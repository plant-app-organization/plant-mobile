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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import GradientTitle from '../../components/GradientTitle/GradientTitle'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { ChevronLeftIcon, CheckIcon } from 'react-native-heroicons/solid'

import { Input, TextArea, FormControl, Select } from 'native-base'

import { LinearGradient } from 'expo-linear-gradient'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ConnectModal from '../../components/ConnectModal/ConnectModal'

interface AddNewOfferStep3ScreenProps {}
//
const AddNewOfferStep3Screen: React.FunctionComponent<AddNewOfferStep3ScreenProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState(null)
  const [regionName, setRegionName] = useState<string>('')
  const [postCode, setPostCode] = useState<string>('')
  const [location, setLocation] = useState(null)
  const [title, setTitle] = useState<string>('')
  const [pot, setPot] = useState<boolean>(false)
  const [environment, setEnvironment] = useState<string>('')

  const [health, setHealth] = useState<string>('')
  const [maintenanceDifficultyLevel, setMaintenanceDifficultyLevel] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [plantHeight, setPlantHeight] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const isFocused = useIsFocused()
  const navigation = useNavigation()
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
    setDescription(value)
  }, [])

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value)
  }, [])

  const handleToggle = () => {
    setPot(!pot)
  }
  const TAB_BAR_HEIGHT = 80

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
                    borderColor: `${!location ? '#BFE6CB' : '#79acd8'}`,
                    borderWidth: 1,
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
                    color: '#3caf50',
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
                  selectedValue={environment}
                  minWidth='200'
                  accessibilityLabel='Environnement'
                  placeholder='Intérieur ou extérieur'
                  fontSize={16}
                  placeholderTextColor='#73859e'
                  backgroundColor={'#F5F5F5'}
                  _selectedItem={{
                    bg: '#6AB2DF',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  borderColor={'#BFE6CB'}
                  mt={1}
                  onValueChange={(itemValue) => setEnvironment(itemValue)}
                >
                  <Select.Item label='Intérieur' value='indoor' />
                  <Select.Item label='Extérieur' value='outdoor' />
                  <Select.Item label='Intérieur & extérieur' value='both' />
                </Select>
              </FormControl>
              <FormControl w='100%' isRequired>
                <Select
                  className='rounded-sm'
                  selectedValue={category}
                  minWidth='200'
                  accessibilityLabel='Catégorie'
                  backgroundColor={'#F5F5F5'}
                  placeholder=' Catégorie'
                  fontSize={16}
                  placeholderTextColor='#73859e'
                  _selectedItem={{
                    bg: '#6AB2DF',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  borderColor={'#BFE6CB'}
                  mt={1}
                  onValueChange={(itemValue) => setCategory(itemValue)}
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
                  selectedValue={health}
                  minWidth='200'
                  accessibilityLabel='Santé'
                  placeholder='État de santé'
                  fontSize={16}
                  backgroundColor={'#F5F5F5'}
                  placeholderTextColor='#73859e'
                  _selectedItem={{
                    bg: '#6AB2DF',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  borderColor={'#BFE6CB'}
                  mt={1}
                  onValueChange={(itemValue) => setHealth(itemValue)}
                >
                  <Select.Item label='excellent' value='excellent' />
                  <Select.Item label='bon' value='good' />
                  <Select.Item label='correct' value='correct' />
                  <Select.Item label='mauvais état' value='bad' />
                </Select>
              </FormControl>

              <FormControl w='100%' isRequired>
                <Select
                  selectedValue={maintenanceDifficultyLevel}
                  minWidth='200'
                  accessibilityLabel='Entretien'
                  placeholder='Entretien'
                  backgroundColor={'#F5F5F5'}
                  fontSize={16}
                  borderColor={'#BFE6CB'}
                  placeholderTextColor='#73859e'
                  _selectedItem={{
                    bg: '#6AB2DF',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setMaintenanceDifficultyLevel(itemValue)}
                >
                  <Select.Item label='facile' value='easy' />
                  <Select.Item label='intermédiaire' value='intermediary' />
                  <Select.Item label='difficile' value='difficult' />
                </Select>
              </FormControl>
            </View>
          </View>

          {Platform.OS === 'android' && <View className='h-32'></View>}
          <SignedOut>
            <ConnectModal />
          </SignedOut>
        </KeyboardAwareScrollView>
        <View
          className='bg-white  w-full  flex flex-col'
          style={{ position: 'absolute', bottom: TAB_BAR_HEIGHT }}
        >
          <View className='bg-darkleaf min-h-[4] w-3/4 rounded-br-lg rounded-tr-lg'></View>
          <View className='flex flex-row justify-end items-end px-2 py-2'>
            <TouchableOpacity
              className=' rounded-md flex items-center justify-center bg-darkleaf shadow-lg px-2 py-1 border-2 border-darkleaf'
              onPress={() => navigation.navigate('AddNewOfferStep4Screen')}
            >
              <Text className='text-white text-lg font-manropeBold'>Continuer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
export default AddNewOfferStep3Screen
