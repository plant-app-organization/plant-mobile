import React, { useState, useRef, useEffect, useCallback } from 'react'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@env'
import PropTypes from 'prop-types'
import ConfettiCannon from 'react-native-confetti-cannon'

import {
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Dimensions,
} from 'react-native'

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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { useCreateNewOfferMutation } from '../../graphql/graphql'
import * as ImagePicker from 'expo-image-picker'
import Slider from '@react-native-community/slider'
import ModalPreview from '../../components/modals/ModalPreview'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ValidationView from '../../components/ValidationView/ValidationView'

interface AddScreenProps {}
//
const AddScreen: React.FunctionComponent<AddScreenProps> = (props) => {
  const [shoot, setShoot] = useState(false)
  const navigation = useNavigation()
  const { width, height } = useWindowDimensions()
  const [createNewOffer] = useCreateNewOfferMutation()
  const toast = useToast()

  const { getToken } = useAuth()
  const [sessionToken, setSessionToken] = React.useState('')

  const { isSignedIn, user } = useUser()
  const isFocused = useIsFocused()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [placement, setPlacement] = useState(undefined)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const [regionName, setRegionName] = useState<string>('')
  const [postCode, setPostCode] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [environment, setEnvironment] = useState<string>('')
  const [pot, setPot] = useState<boolean>(false)
  const [health, setHealth] = useState<string>('')
  const [maintenanceDifficultyLevel, setMaintenanceDifficultyLevel] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean | void | undefined>(false)
  const [isLoaderOpen, setIsLoaderOpen] = useState<boolean | void | undefined>(false)
  const [fullScreenImage, setFullScreenImage] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [location, setLocation] = useState(null)
  // console.log('🔎Location', location)
  // console.log('title', title)
  // const [slideStartingValue, setSlideStartingValue] = useState(0);
  // const [slideStartingCount, setSlideStartingCount] = useState(0);
  const [plantHeight, setPlantHeight] = useState<number>(0)
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
  console.log('api', GOOGLE_PLACES_API_KEY)
  const openSuccessModal = () => {
    setShoot(true)
    setTimeout(() => {
      setIsSuccessModalOpen(true)
    }, 2000)

    setTimeout(() => {
      navigation.navigate('Home')
      setIsSuccessModalOpen(false)
    }, 3000)
  }
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
    console.log('🤹data', data, '🔥details', details)
  }
  const openModalHandler = () => {
    console.log('CLICKED')
    setShowModal(true)
  }

  function handleDeleteImage(index) {
    const newImagesUrls = [...imagesUrls]
    newImagesUrls.splice(index, 1)
    setImagesUrls(newImagesUrls)
  }

  const handleToggle = () => {
    setPot(!pot)
  }

  const [imagesUrls, setImagesUrls] = useState([])
  useEffect(() => {
    !isSignedIn && isFocused && setIsOpen(true)
  }, [isSignedIn, isFocused])

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleNavigation = () => {
    props.navigation.navigate('BottomTabs', { screen: 'Home' })
    closeModal()
  }

  useEffect(() => {
    const scheduler = setInterval(async () => {
      const token = await getToken()
      setSessionToken(token as string)
    }, 1000)

    return () => clearInterval(scheduler)
  }, [])

  const addImage = async () => {
    if (imagesUrls.length < 3) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.1,
      }).then((image) => {
        // console.log('image', image);
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
            name: 'newPic',
          }
          data.append('file', source)
          data.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
          data.append('cloud_name', process.env.CLOUDINARY_CLOUD_NAME)
          fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: 'post',
              body: data,
            },
          )
            .then((res) => res.json())
            .then(async (data) => {
              // console.log('📸data.secure_url', data.secure_url)
              setImagesUrls([...imagesUrls, data.secure_url])
              setIsLoaderOpen(false)
            })
            .catch((err) => {
              // console.log(err)
            })
        }
      })
    } else {
      toast.show({
        title: '3 images maximum',
      })
    }
  }
  const onCreateNewOfferPress = async () => {
    if (location && title != '' && price != '' && description.length > 20 && imagesUrls.length) {
      // console.log('🧡requete!')
      const response = await createNewOffer({
        variables: {
          newOfferInput: {
            plantName: title,
            description: description,
            pictures: imagesUrls,
            price: Number(price),
            category,
            environment,
            health,
            pot,
            plantHeight: Math.floor(plantHeight),
            maintenanceDifficultyLevel,
            location: location.formatted_address,
            latitude: location.geometry.location.lat,
            longitude: location.geometry.location.lng,
            city: location.vicinity,
            postcode: postCode,
            region: regionName,
          },
        },
      })
      // console.log('response', response)
      if (response) {
        openSuccessModal()
      }
    } else {
      alert('Veuillez remplir tous les champs')
    }
  }

  const styles = {
    center: {},
  }
  const handleDescriptionChange = useCallback((value) => {
    setDescription(value)
  }, [])

  const handleTitleChange = useCallback((value) => {
    setTitle(value)
  }, [])

  return (
    <LinearGradient colors={['#FFE2C0', 'white']} className='min-h-screen w-screen flex-1'>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <ScrollView>
          <View className='w-screen h-full items-center justify-evenly '>
            <View className='h-[20vh] w-full justify-evenly items-center'>
              <Text className='text-2xl font-Roboto text-black'>Vendez votre plante</Text>
              <View className=' w-full flex items-center'>
                <TouchableOpacity
                  // style={{
                  //   shadowColor: '#3FA96A',
                  //   shadowOffset: {
                  //     width: 0,
                  //     height: 3,
                  //   },
                  //   shadowOpacity: 1.22,
                  //   shadowRadius: 1.1,
                  //   elevation: 10, // pour Android seulement
                  // }}
                  className='px-10 py-5 rounded-xl bg-white flex items-center justify-center shadow hover:shadow-xl'
                  onPress={addImage}
                >
                  <Text className='text-black text-md font-semibold'>+ Ajouter des photos</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className='flex-row mt-5 mr-5 ml-5'>
              {imagesUrls.map((imageUrl, index) => {
                return (
                  <View key={index} className='relative '>
                    <TouchableOpacity onPress={() => openModalHandler()}>
                      <Image
                        key={index}
                        alt='image'
                        className='rounded-md mr-2'
                        width={width * 0.3}
                        height={width * 0.2}
                        resizeMode='cover'
                        source={{
                          uri: imageUrl,
                        }}
                      />
                      {showModal && (
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                          <Modal.Content maxWidth='500px' style={{ backgroundColor: '#f2fff3' }}>
                            <Modal.CloseButton />

                            <Modal.Body>
                              <Image
                                key={index}
                                alt='image'
                                className='rounded-md mr-2'
                                width={400}
                                height={400}
                                resizeMode='cover'
                                source={{
                                  uri: imageUrl,
                                }}
                              />
                              <Button
                                variant='ghost'
                                colorScheme='blueGray'
                                onPress={() => {
                                  setShowModal(false)
                                }}
                              >
                                fermer
                              </Button>
                            </Modal.Body>
                          </Modal.Content>
                        </Modal>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ position: 'absolute', top: 0, right: 10 }}
                      onPress={() => handleDeleteImage(index)}
                    >
                      <FontAwesomeIcon name={'times-circle'} size={20} color={'white'} />
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>

            <View className='bg-white w-[90%] h-[150px] items-center justify-evenly rounded-lg shadow'>
              {searchQuery === '' && (
                <Text className='text-base font-semibold'>
                  À quelle adresse {'\n'}peut-on récupérer votre plante ?
                </Text>
              )}
              <GooglePlacesAutocomplete
                placeholder='Adresse'
                onPress={(data, details = null) => {
                  console.log('data', data, 'details', details)
                  onSelectLocation(data, details)
                }}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'fr',
                  components: 'country:fr',
                }}
                fetchDetails={true}
                enablePoweredByContainer={false}
                onFail={(error) => console.log(error)}
                onNotFound={() => console.log('no results')}
                listEmptyComponent={() => (
                  <View style={{ flex: 1 }}>
                    <Text>Nous n'avons pas trouvé cette adresse</Text>
                  </View>
                )}
                textInputProps={{
                  autoFocus: false,
                  blurOnSubmit: false,
                  style: {
                    backgroundColor: '#F5F5F5',
                    width: '100%',
                    height: 45,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  },
                  value: searchQuery,
                  onChangeText: (text) => setSearchQuery(text),
                }}
                styles={{
                  container: {
                    flex: 0,
                    width: '80%',
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
                  w='80%'
                />
              </View>
              <View className='py-5'>
                <Text className='text-base font-semibold mb-3'>Décrivez votre plante</Text>

                <TextArea
                  h={20}
                  value={description}
                  onChangeText={(value) => setDescription(value)}
                  placeholder='Description'
                  size='xl'
                  fontSize={15}
                  w='80%'
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
                <Slider
                  style={{ width: '100%' }}
                  minimumValue={0}
                  maximumValue={300}
                  minimumTrackTintColor='#3FA96A'
                  maximumTrackTintColor='#000000'
                  // onValueChange={(value) => {
                  //   console.log('value', value);
                  //   setPlantHeight(Math.floor(value));
                  // }}
                  onSlidingComplete={(value) => {
                    setPlantHeight(value)
                  }}
                />
              </View>

              <View className='w-[80%] py-5 items-center'>
                <FormControl w='100%' isRequired isInvalid className='mt-10 mb-10'>
                  <Select
                    selectedValue={environment}
                    minWidth='200'
                    accessibilityLabel='Environnement'
                    placeholder='Intérieur ou extérieur'
                    fontSize={16}
                    placeholderTextColor='black'
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setEnvironment(itemValue)}
                  >
                    <Select.Item label='Intérieur' value='indoor' />
                    <Select.Item label='Extérieur' value='outdoor' />
                    <Select.Item label='Intérieur & extérieur' value='both' />
                  </Select>
                </FormControl>
                <FormControl w='100%' isRequired isInvalid>
                  <Select
                    className='rounded-sm'
                    selectedValue={category}
                    minWidth='200'
                    accessibilityLabel='Catégorie'
                    placeholder=' Catégorie'
                    fontSize={16}
                    placeholderTextColor='black'
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size={3} />,
                    }}
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

                <FormControl w='100%' isRequired isInvalid className='mt-10 mb-10'>
                  <Select
                    selectedValue={health}
                    minWidth='200'
                    accessibilityLabel='Santé'
                    placeholder='État de santé'
                    fontSize={16}
                    placeholderTextColor='black'
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setHealth(itemValue)}
                  >
                    <Select.Item label='excellent' value='excellent' />
                    <Select.Item label='bon' value='good' />
                    <Select.Item label='correct' value='correct' />
                    <Select.Item label='mauvais état' value='bad' />
                  </Select>
                </FormControl>

                <FormControl w='100%' isRequired isInvalid>
                  <Select
                    selectedValue={maintenanceDifficultyLevel}
                    minWidth='200'
                    accessibilityLabel='Entretien'
                    placeholder='Entretien'
                    fontSize={16}
                    placeholderTextColor='black'
                    _selectedItem={{
                      bg: 'teal.600',
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

            <TouchableOpacity
              className='bg-white w-[80%] my-10 py-3 rounded-2xl justify-center items-center shadow border border-gray-200'
              onPress={onCreateNewOfferPress}
            >
              <Text className='text-zinc-800 text-lg font-semibold tracking-widest'>Ajouter</Text>
            </TouchableOpacity>
            <View className='h-[100px] w-full' />
          </View>
          {shoot ? <ConfettiCannon fadeOut={true} count={300} origin={{ x: -10, y: 0 }} /> : null}
        </ScrollView>

        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => {
            navigation.navigate('Home')
            setIsSuccessModalOpen(false)
          }}
          safeAreaTop={true}
        >
          <Modal.Content maxWidth='350'>
            <Text className='text-xl font-Roboto   ml-3 text-center mt-3 mb-3'>
              Félicitations, votre offre a été soumise à notre équipe de modération !
            </Text>
            <ValidationView />
          </Modal.Content>
        </Modal>

        <Modal isOpen={isOpen} safeAreaTop={true}>
          <Modal.Content style={{ backgroundColor: '#f2fff3' }} maxWidth='350'>
            <Modal.Header style={{ backgroundColor: '#f2fff3' }}>
              <Text className='text-xl font-Roboto   ml-3 text-center'>
                Connectez-vous pour découvrir toutes les fonctionnalités
              </Text>
            </Modal.Header>
            <Modal.Body>
              <TouchableOpacity
                onPress={() => {
                  props.navigate('BottomTabs', { screen: 'Profile' })
                }}
              >
                <Text
                  style={{ backgroundColor: '#f2fff3' }}
                  className='text-md font-Roboto text-center  ml-3 '
                >
                  Se connecter ou s'inscrire
                </Text>
              </TouchableOpacity>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2fff3' }}>
              <TouchableOpacity onPress={() => handleNavigation()}>
                <Text className='text-xs   ml-3 text-center font-Roboto   '>Non merci</Text>
              </TouchableOpacity>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Modal isOpen={isLoaderOpen} safeAreaTop={true}>
          <Modal.Content maxWidth='350' style={{ backgroundColor: '#f2fff3' }}>
            <Modal.Body>
              <Spinner size='lg' color='emerald.500' accessibilityLabel='Loading image' />
              <Text className='text-sm font-Roboto  color-deepBlue font-ralewayBold mt-2  my-2 text-center '>
                Envoi de l'image en cours ...
              </Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default AddScreen
