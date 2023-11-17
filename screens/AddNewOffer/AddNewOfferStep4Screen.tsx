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
import { ChevronLeftIcon } from 'react-native-heroicons/solid'

import { Input, TextArea } from 'native-base'

import { LinearGradient } from 'expo-linear-gradient'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ConnectModal from '../../components/ConnectModal/ConnectModal'

interface AddNewOfferStep4ScreenProps {}
//
const AddNewOfferStep4Screen: React.FunctionComponent<AddNewOfferStep4ScreenProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState(null)
  const [regionName, setRegionName] = useState<string>('')
  const [postCode, setPostCode] = useState<string>('')
  const [location, setLocation] = useState(null)
  const [title, setTitle] = useState<string>('')
  const [pot, setPot] = useState<boolean>(false)
  const [plantHeight, setPlantHeight] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const isFocused = useIsFocused()
  const TAB_BAR_HEIGHT = 80
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
                <GradientTitle title='Quel est votre prix ?' align='left' />
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
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: '#3caf50',
                  },
                }}
              />
            </View>

            <View className='w-[95%] bg-white  items-center justify-around rounded-lg shadow mt-4'>
              <View className='py-5 px-3'>
                <Text
                  className='font-semibold mb-1 text-sm'
                  style={{ fontFamily: 'manrope_bold', color: '#73859e' }}
                >
                  Comment décririez-vous votre plante ?
                </Text>
                <Text className='text-xs mb-2' style={{ fontFamily: 'manrope', color: '#7994b7' }}>
                  Fournissez tous les détails : partagez l'histoire unique de votre plante, décrivez
                  son état de santé actuel et laissez libre cours à votre créativité !{' '}
                </Text>
                <TextArea
                  h={40}
                  value={description}
                  onChangeText={(value) => setDescription(value)}
                  placeholder='Description'
                  size='xl'
                  w='100%'
                  focusOutlineColor='#BFE6CB'
                  color='black'
                  outlineColor={'white'}
                  backgroundColor={'#F5F5F5'}
                  fontSize={15}
                  keyboardType='visible-password'
                  invalidOutlineColor={'red.600'}
                  isInvalid={false}
                />
              </View>

              <View className='flex flex-row justify-start  py-5 w-full'>
                <View className='flex flex-row items-center justify-start '>
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

                {/* <TouchableOpacity
                  onPress={handleToggle}
                  className='w-6/12 flex flex-row items-center justify-evenly'
                >
                  <FontAwesomeIcon
                    name={!pot ? 'check-square' : 'square-o'}
                    size={24}
                    color={!pot ? '#008000' : '#808080'}
                  />
                  <Text className='text-base font-semibold'>Cache-pot</Text>
                </TouchableOpacity> */}
              </View>
              {/* 
              <View className='py-5 w-[80%] items-center'>
                <Text className='font-semibold text-base'>
                  Hauteur: {Math.floor(plantHeight).toString()} cm
                </Text>
              </View>

              <View className='w-[80%] py-5 items-center'></View> */}
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
          <View className='bg-darkleaf min-h-[4] w-4/4 rounded-br-lg rounded-tr-lg'></View>
          <View className='flex flex-row justify-end items-end px-2 py-2'>
            <TouchableOpacity
              className=' rounded-md flex items-center justify-center bg-darkleaf shadow-lg px-2 py-1 border-2 border-darkleaf'
              onPress={() => console.log('clic')}
            >
              <Text className='text-white text-lg font-manropeBold'>Continuer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
export default AddNewOfferStep4Screen
