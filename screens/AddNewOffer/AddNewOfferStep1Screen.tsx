import React, { useState, useCallback } from 'react'

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  useWindowDimensions,
  Dimensions,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import {
  Select,
  FormControl,
  WarningOutlineIcon,
  CheckIcon,
  Modal,
  Image,
  Spinner,
  useToast,
  Checkbox,
  Button,
  Stack,
  Input,
  TextArea,
} from 'native-base'

import { LinearGradient } from 'expo-linear-gradient'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

interface AddNewOfferStep1ScreenProps {}
//
const AddNewOfferStep1Screen: React.FunctionComponent<AddNewOfferStep1ScreenProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState(null)
  const [regionName, setRegionName] = useState<string>('')
  const [postCode, setPostCode] = useState<string>('')
  const [location, setLocation] = useState(null)
  const [title, setTitle] = useState<string>('')
  const [pot, setPot] = useState<boolean>(false)
  const [plantHeight, setPlantHeight] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')

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
          <View className='w-screen h-full items-center justify-evenly '>
            <Text className='text-2xl font-Roboto text-black'>Vendez votre plante</Text>
            <View className='bg-white w-[90%]  items-center justify-evenly rounded-lg shadow pt-3'>
              <Text className='text-base font-semibold mb-3 mr-auto ml-3'>
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
                  autoFocus: false,
                  blurOnSubmit: false,
                  style: {
                    backgroundColor: '#F5F5F5',
                    width: '100%',
                    height: 45,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    fontSize: 15,
                  },
                }}
                styles={{
                  container: {
                    flex: 0,
                    width: '95%',
                    alignItems: 'center',
                  },
                  description: {
                    color: '#000',
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: '#3caf50',
                  },
                }}
              />
              <Text className='px-4 text-xs' style={{ fontFamily: 'manrope_bold' }}></Text>
            </View>
            <View className='w-[90%] bg-white min-h-screen items-center justify-evenly rounded-lg shadow mt-10'>
              <View className='py-5'>
                <Text className='text-base font-semibold mb-3'>
                  Quel est le nom de votre plante ?
                </Text>
                <Input
                  variant='filled'
                  value={title}
                  onChangeText={(value) => setTitle(value)}
                  placeholder='Titre'
                  size='xl'
                  fontSize={15}
                  w='90%'
                  focusOutlineColor='#BFE6CB'
                  color='#79acd8'
                  bg='e2e2e2'
                  fontSize={15}
                  keyboardType='visible-password'
                />
              </View>
              <View className='py-5'>
                <Text className='text-base font-semibold mb-3'>Décrivez votre plante</Text>

                <TextArea
                  h={40}
                  value={description}
                  onChangeText={(value) => setDescription(value)}
                  placeholder='Description'
                  size='xl'
                  w='90%'
                  focusOutlineColor='#BFE6CB'
                  color='#79acd8'
                  bg='e2e2e2'
                  fontSize={15}
                  keyboardType='visible-password'
                />
              </View>

              <View className='w-[80%] flex flex-row py-5'>
                <View className='w-6/12 flex flex-row items-center justify-evenly'>
                  <Text className='text-base font-semibold'>Prix :</Text>
                  <TextInput
                    style={{
                      fontSize: 16,
                      backgroundColor: '#F5F5F5',
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      borderRadius: 4,
                    }}
                    value={price}
                    onChangeText={(value) => setPrice(value)}
                    keyboardType='numeric'
                    placeholder='0,00 €'
                  />
                </View>

                <TouchableOpacity
                  onPress={handleToggle}
                  className='w-6/12 flex flex-row items-center justify-evenly'
                >
                  <FontAwesomeIcon
                    name={!pot ? 'check-square' : 'square-o'}
                    size={24}
                    color={!pot ? '#008000' : '#808080'}
                  />
                  <Text className='text-base font-semibold'>Cache-pot</Text>
                </TouchableOpacity>
              </View>

              <View className='py-5 w-[80%] items-center'>
                <Text className='font-semibold text-base'>
                  Hauteur: {Math.floor(plantHeight).toString()} cm
                </Text>
              </View>

              <View className='w-[80%] py-5 items-center'></View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}
export default AddNewOfferStep1Screen
