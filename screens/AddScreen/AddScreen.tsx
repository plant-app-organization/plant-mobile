import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {
  Select,
  FormControl,
  WarningOutlineIcon,
  CheckIcon,
  Modal,
  Image,
  Spinner,
  useToast,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { useCreateNewOfferMutation } from '../../graphql/graphql';
import * as ImagePicker from 'expo-image-picker';

interface AddScreenProps {}

const AddScreen: React.FunctionComponent<AddScreenProps> = (props) => {
  const { width, height } = useWindowDimensions();
  const [createNewOffer] = useCreateNewOfferMutation();
  const toast = useToast();

  const { getToken } = useAuth();
  const [sessionToken, setSessionToken] = React.useState('');

  const { isSignedIn, user } = useUser();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [pot, setPot] = useState<boolean>(true);
  const [health, setHealth] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean | void | undefined>(false);
  const [isLoaderOpen, setIsLoaderOpen] = useState<boolean | void | undefined>(false);

  const [imagesUrls, setImagesUrls] = useState([]);
  useEffect(() => {
    !isSignedIn && setIsOpen(true);
  }, [isSignedIn, isFocused]);

  const handleNavigation = () => {
    navigation.navigate('BottomTabs', { screen: 'Home' });
    setIsOpen(false);
  };

  useEffect(() => {
    const scheduler = setInterval(async () => {
      const token = await getToken();
      setSessionToken(token as string);
    }, 1000);

    return () => clearInterval(scheduler);
  }, []);

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.2,
    }).then((image) => {
      // console.log('image', image);
      if (image.canceled) {
        return;
      }
      if (!image.canceled) {
        console.log('image.assets', image.assets);
        setIsLoaderOpen(true);
        const data = new FormData();
        const source = {
          uri: image.assets[0].uri,
          type: 'image/jpeg',
          name: 'newPic',
        };
        data.append('file', source);
        data.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
        data.append('cloud_name', process.env.CLOUDINARY_CLOUD_NAME);
        fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'post',
          body: data,
        })
          .then((res) => res.json())
          .then(async (data) => {
            console.log('????data.secure_url', data.secure_url);
            setImagesUrls([...imagesUrls, data.secure_url]);
            setIsLoaderOpen(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const onCreateNewOfferPress = async () => {
    if (title != '' && price != '' && description.length > 20 && imagesUrls.length) {
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
          },
        },
      });
      console.log('response', response);
      response &&
        toast.show({
          title: '???? Votre offre a ??t?? publi??e !',
        });
    } else {
      alert('Erreur', 'Veuillez remplir tous les champs');
    }
  };

  return (
    <LinearGradient
      colors={['#f2fff3', '#bee6c2', '#f2fff3', '#f2fff3', '#f2fff3', '#bee6c2']}
      className='h-screen w-screen flex-1'
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View className='w-screen h-full items-center justify-evenly '>
          <View className=' items-center mt-20'>
            <Text
              style={{
                shadowColor: 'white',
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 3.22,
                shadowRadius: 1.1,
              }}
              className='flex items-center text-2xl font-antipasto text-black  '
            >
              Vends une plante
            </Text>
            <View className='flex items-center mt-10 mb-10'>
              <View
                style={{
                  height: 40,
                  width: 200,
                  borderRadius: 15,
                  backgroundColor: '#ccedcf',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#3FA96A',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 1.22,
                  shadowRadius: 1.1,
                }}
              >
                <TouchableOpacity
                  className='h-40 w-200 rounded-10 bg-ccedcf flex items-center justify-center shadow-lg hover:shadow-xl'
                  onPress={addImage}
                >
                  <Text className='font-antipasto text-black text-lg font-bold'>
                    + AJOUTER DES PHOTOS
                  </Text>
                </TouchableOpacity>
              </View>

              <View className='flex-row'>
                {imagesUrls.map((imageUrl, index) => {
                  return (
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
                  );
                })}
              </View>
            </View>
            <View className='h-px w-screen bg-black opacity-30 -mb-15' />
          </View>
          <View className='h-[80%] flex flex-col justify-center m-3'>
            <View
              style={{
                position: 'relative',
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 25,

                paddingLeft: 20,
                marginBottom: 30,
                width: 300,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: -25,
                  left: 10,
                  backgroundColor: 'transparent',
                  paddingHorizontal: 5,
                }}
              >
                <Text className='font-antipasto text-sm text-left text-xl  font-antipasto opacity-100'>
                  Titre :
                </Text>
              </View>
              <TextInput
                style={{ height: 40, width: 240, fontSize: 15 }}
                value={title}
                onChangeText={setTitle}
                placeholder='ex: Monstera avec pot...'
              />
            </View>
            <View
              style={{
                position: 'relative',
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 25,
                paddingLeft: 20,
                marginBottom: 30,
                width: 300,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: -25,
                  left: 10,
                  backgroundColor: 'transparent',
                  paddingHorizontal: 5,
                }}
              >
                <Text className='font-antipasto text-sm text-left text-xl font-antipasto'>
                  D??cris ta plante :
                </Text>
              </View>
              <TextInput
                style={{ height: 80, width: 240, fontSize: 15 }}
                value={description}
                onChangeText={setDescription}
                placeholder='ex: Hauteur de 1m60, plante d interieur, pas besoins de beaucoup de soleil...'
              />
            </View>
            <View
              style={{
                position: 'relative',
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 25,
                paddingLeft: 20,

                width: 300,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: -25,
                  left: 10,
                  backgroundColor: 'transparent',
                  paddingHorizontal: 5,
                }}
              >
                <Text className='font-antipasto text-sm text-left text-xl font-antipasto'>
                  Prix :
                </Text>
              </View>
              <TextInput
                style={{ height: 40, width: 240, fontSize: 15 }}
                value={price}
                onChangeText={setPrice}
                placeholder='ex: 18 euros...'
              />
            </View>
            <View className='mt-5'>
              <FormControl w='3/4' maxW='300' isRequired isInvalid>
                <Select
                  className='rounded-sm'
                  selectedValue={category}
                  minWidth='200'
                  accessibilityLabel='Cat??gorie'
                  placeholder=' Cat??gorie'
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size={3} />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                >
                  <Select.Item label='Tropicales' value='Tropicales' />
                  <Select.Item label='Rares' value='Rares' />
                  <Select.Item label='Potager' value='Potager' />
                  <Select.Item label='Aromatiques' value='Aromatiques' />
                  <Select.Item label='Cactus' value='Cactus' />
                </Select>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>
                  veuillez faire une s??lection!
                </FormControl.ErrorMessage>
              </FormControl>
            </View>
            <View>
              <FormControl w='3/4' maxW='300' isRequired isInvalid>
                <Select
                  selectedValue={health}
                  minWidth='200'
                  accessibilityLabel='Sant??'
                  placeholder='Sant??'
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setHealth(itemValue)}
                >
                  <Select.Item label='excellent' value='excellent' />
                  <Select.Item label='correcte' value='correcte' />
                  <Select.Item label='mauvais ??tat' value='mauvais ??tat' />
                </Select>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>
                  veuillez faire une s??lection!
                </FormControl.ErrorMessage>
              </FormControl>
              <View className='flex items-center mt-10 mb-10'>
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
                  }}
                >
                  <TouchableOpacity
                    className='h-40 w-200 rounded-25 bg-ccedcf flex items-center justify-center shadow-lg hover:shadow-xl'
                    onPress={onCreateNewOfferPress}
                  >
                    <Text className='font-antipasto text-black text-lg font-bold'>AJOUTER</Text>
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
            <Text className='text-xl   ml-3 text-center'>
              Connectez-vous pour d??couvrir toutes les fonctionnalit??s
            </Text>
          </Modal.Header>
          <Modal.Body>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BottomTabs', { screen: 'Profile' });
              }}
            >
              <Text style={{ backgroundColor: '#f2fff3' }} className='text-md text-center  ml-3 '>
                Se connecter ou s'inscrire
              </Text>
            </TouchableOpacity>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#f2fff3' }}>
            <TouchableOpacity onPress={handleNavigation}>
              <Text className='text-xs   ml-3 text-center  '>Non merci</Text>
            </TouchableOpacity>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={isLoaderOpen} safeAreaTop={true}>
        <Modal.Content maxWidth='350'>
          <Modal.Body>
            <Spinner accessibilityLabel='Loading image' />
            <Text className='text-sm  color-deepBlue font-ralewayBold mt-2  my-2 text-center'>
              Envoi de l'image en cours ...
            </Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </LinearGradient>
  );
};

export default AddScreen;
