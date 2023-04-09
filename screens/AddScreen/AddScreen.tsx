import React, { useState, useRef, useEffect } from 'react'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@env'
import PropTypes from 'prop-types'
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
} from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { useCreateNewOfferMutation } from '../../graphql/graphql'
import * as ImagePicker from 'expo-image-picker'
import Slider from '@react-native-community/slider'
import { AddressAutofill } from '@mapbox/search-js-react'
import ModalPreview from '../../components/modals/ModalPreview'

interface AddScreenProps {}

const AddScreen: React.FunctionComponent<AddScreenProps> = (props) => {
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
  const [category, setCategory] = useState<string>('')
  const [pot, setPot] = useState<boolean>(false)
  const [health, setHealth] = useState<string>('')
  const [maintenanceDifficultyLevel, setMaintenanceDifficultyLevel] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean | void | undefined>(false)
  const [isLoaderOpen, setIsLoaderOpen] = useState<boolean | void | undefined>(false)
  const [fullScreenImage, setFullScreenImage] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // const [slideStartingValue, setSlideStartingValue] = useState(0);
  // const [slideStartingCount, setSlideStartingCount] = useState(0);
  const [plantHeight, setPlantHeight] = useState<number>(0)

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
          console.log('image.assets', image.assets)
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
              console.log('📸data.secure_url', data.secure_url)
              setImagesUrls([...imagesUrls, data.secure_url])
              setIsLoaderOpen(false)
            })
            .catch((err) => {
              console.log(err)
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
    if (title != '' && price != '' && description.length > 20 && imagesUrls.length) {
      console.log('🧡requete!')
      const response = await createNewOffer({
        variables: {
          newOfferInput: {
            plantName: title,
            description: description,
            pictures: imagesUrls,
            price: Number(price),
            category,
            health,
            pot,
            plantHeight: Math.floor(plantHeight),
            maintenanceDifficultyLevel,
          },
        },
      })
      console.log('response', response)
      response &&
        toast.show({
          title: '🪴 Votre offre a été publiée !',
        })
    } else {
      alert('Erreur', 'Veuillez remplir tous les champs')
    }
  }

  return (
    <LinearGradient
      colors={['#BFE6CB', '#EFFFFD', '#FEFFFF']}
      className='min-h-screen w-screen flex-1'
    >
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      >
        <ScrollView>
          <View className='w-screen h-full items-center justify-evenly '>
            <View className='h-[20vh] w-full justify-evenly items-center'>
              <Text
                style={{
                  shadowColor: 'white',
                  shadowOffset: {
                    width: 2,
                    height: 2,
                  },
                  shadowOpacity: 3.22,
                  shadowRadius: 1.1,
                  elevation: 3, // pour Android seulement
                }}
                className='text-2xl font-Roboto text-black'
              >
                Vends une plante
              </Text>
              <View className=' w-full flex items-center'>
                <TouchableOpacity
                  style={{
                    shadowColor: '#3FA96A',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 1.22,
                    shadowRadius: 1.1,
                    elevation: 10, // pour Android seulement
                  }}
                  className='px-5 py-2 rounded-3xl bg-[#ccedcf] flex items-center justify-center shadow-lg hover:shadow-xl'
                  onPress={addImage}
                >
                  <Text style={{ fontFamily: 'Roboto' }} className='-black text-m font-bold'>
                    + AJOUTER DES PHOTOS
                  </Text>
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

            <View className='w-full min-h-[100vh] flex flex-col justify-evenly items-center pt-10 '>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',

                  width: 300,
                }}
              >
                <Input
                  variant='outline'
                  value={title}
                  onChangeText={setTitle}
                  placeholder='Titre'
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',

                  width: 300,
                }}
              >
                <Input
                  variant='outline'
                  value={description}
                  onChangeText={setDescription}
                  placeholder='Description'
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text className=' text-l font-Roboto mr-1'>Prix :</Text>

                  <TextInput
                    style={{
                      height: 40,
                      fontSize: 15,
                      borderWidth: 0.5,
                      borderColor: 'gray',
                      borderRadius: 10,
                      padding: 10,
                      width: 70,
                    }}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType='numeric'
                    placeholder='0,00'
                  />
                  <Text className=' text-l font-Roboto ml-1 mr-10'>€</Text>
                </View>
                <TouchableOpacity onPress={handleToggle}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesomeIcon
                      name={!pot ? 'check-square' : 'square-o'}
                      size={24}
                      color={!pot ? '#008000' : '#808080'}
                    />
                    <Text style={{ marginLeft: 8 }}>Avec cache-pot</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className='justify-evenly items-center '>
                <Text>Hauteur: {Math.floor(plantHeight).toString()} cm</Text>
                <Slider
                  style={{ width: 300, height: 40 }}
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

              <View>
                <FormControl w='3/4' maxW='300' isRequired isInvalid>
                  <Select
                    className='rounded-sm'
                    selectedValue={category}
                    minWidth='200'
                    accessibilityLabel='Catégorie'
                    placeholder=' Catégorie'
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
                    <Select.Item label='Plantes grasses' value='succulent' />
                    <Select.Item label='Autre' value='autre' />
                  </Select>
                </FormControl>

                <FormControl w='3/4' maxW='300' isRequired isInvalid className='mt-10 mb-10'>
                  <Select
                    selectedValue={health}
                    minWidth='200'
                    accessibilityLabel='Santé'
                    placeholder='État de santé'
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

                <FormControl w='3/4' maxW='300' isRequired isInvalid>
                  <Select
                    selectedValue={maintenanceDifficultyLevel}
                    minWidth='200'
                    accessibilityLabel='Entretien'
                    placeholder='Entretien'
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
                <View className='flex items-center mt-10 mb-20'>
                  <View
                    style={{
                      height: 40,
                      width: 200,
                      borderRadius: 25,
                      backgroundColor: '#ccedcf',
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#3FA96A',
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 15.22,
                      shadowRadius: 16.1,
                      elevation: 10, // pour Android seulement
                    }}
                  >
                    <TouchableOpacity
                      className='h-40 w-200 rounded-25 bg-ccedcf flex items-center justify-center shadow-lg hover:shadow-xl '
                      onPress={onCreateNewOfferPress}
                    >
                      <Text className='font-Roboto text-black text-ml '>AJOUTER</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
