import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  StatusBar,
  Platform,
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from 'react-native'

import { Image } from 'expo-image'

import { Spinner, Switch } from 'native-base'

import CardProduct from '../../components/product/CardProduct'
import CardDeal from '../../components/super-deals/CardDeal'
import CardCategorie from '../../components/categories/CardCategorie'
import CardPlanter from '../../components/planters/CardPlanter'
import CardSuggestion from '../../components/suggestions/CardSuggestion'
// import CardAntigaspi from '../../components/antigaspi/CardAntigaspi';
import { Avatar } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { NoDeprecatedCustomRule } from 'graphql'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useUser } from '@clerk/clerk-expo'
import { useGetUserBookmarksQuery } from '../../graphql/graphql'
import { useNavigation } from '@react-navigation/native'

interface HomeScreenProps {}
//
const HomeScreen: React.FunctionComponent<HomeScreenProps> = (props) => {
  const [search, setSearch] = useState<string>('')
  const { isSignedIn, user } = useUser()
  // const { getToken } = useAuth();
  const { width, height } = useWindowDimensions()
  const { data: userBookmarks, refetch: refetchUserBookmarks } = useGetUserBookmarksQuery()
  console.log('userBookmarks', userBookmarks)
  userBookmarks && bookmarksVar(userBookmarks?.userBookmarks)
  // console.log('user clerk ', user);
  const navigation = useNavigation()

  const dealData: { entreprise: string; ville: string; photo: string }[] = [
    {
      entreprise: 'Jardinerie Ricard',
      ville: 'Marseille',
      photo:
        'https://i.ibb.co/km3V7wX/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-79207055-49ff-4af2-94bb-d4589ab29ca.png',
    },
    {
      entreprise: 'Truffaut',
      ville: 'Paris',
      photo:
        'https://i.ibb.co/km3V7wX/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-79207055-49ff-4af2-94bb-d4589ab29ca.png',
    },
    {
      entreprise: 'Jardiland',
      ville: 'Marseille',
      photo:
        'https://i.ibb.co/CKgsZ9v/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-0e9fca9d-9962-47db-824e-ec52ca710d5.png',
    },
    {
      entreprise: 'MonJardin.COM',
      ville: 'Marseille',
      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
  ]

  const categorieData: { name: string; image: string }[] = [
    {
      name: 'Tropicales',
      image: 'https://i.ibb.co/1Mk58wt/Capture-d-e-cran-2023-01-31-a-15-10-06.png',
    },
    {
      name: 'Rares',
      image: 'https://i.ibb.co/6ZZDhNy/Capture-d-e-cran-2023-01-31-a-15-09-44.png',
    },
    {
      name: 'du Potager',
      image: 'https://i.ibb.co/gDbcht3/Capture-d-e-cran-2023-01-31-a-15-09-58.png',
    },
    {
      name: 'Aromatiques',
      image: 'https://i.ibb.co/KjMfWz9/Capture-d-e-cran-2023-01-31-a-15-10-10.png',
    },
    {
      name: 'Cactus',
      image:
        'https://i.ibb.co/3NgC17d/Hedmo-create-me-a-montserrat-plant-hyper-realistic-with-white-b-ae53c179-487b-4e18-84a6-395a98bbdf5b.png',
    },
  ]

  const plantersData: { name: string; deals: number; image: string }[] = [
    {
      name: 'Marie',
      deals: 1205,
      image:
        'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    {
      name: 'William',
      deals: 1123,
      image:
        'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80',
    },
    {
      name: 'Jardiland',
      deals: 1058,
      image: '',
    },
    {
      name: 'Lucas',
      deals: 978,
      image:
        'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    {
      name: 'Axel',
      deals: 898,
      image:
        'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      name: 'Gabriel',
      deals: 861,
      image:
        'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    },
    {
      name: 'Maxime',
      deals: 561,
      image:
        'https://thumbs.dreamstime.com/z/business-man-standing-confident-smile-portrait-successful-suit-smiling-proud-outdoors-44304293.jpg',
    },
  ]

  const suggestionData: { search: string; views: number }[] = [
    {
      search: 'Montserrat',
      views: 171,
    },
    {
      search: 'Cactus',
      views: 121,
    },
    {
      search: 'Lyrata',
      views: 101,
    },
    {
      search: 'Plantes grasses',
      views: 99,
    },
    {
      search: 'Olivier',
      views: 69,
    },
  ]

  const suggestion = suggestionData.map((data, i) => {
    return <CardSuggestion key={i} search={data.search} views={data.views} />
  })

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <LinearGradient
        // start={{ x: 0.5, y: 0.8 }}
        // end={{ x: 0.8, y: 0 }}
        colors={['#BFE6CB', '#EFFFFD', '#FEFFFF']}
        className='w-screen flex-col items-center py-5'
      >
        {isSignedIn && (
          <View className='w-full flex-row items-center justify-start px-4'>
            <Avatar
              style={{}}
              bg='amber.500'
              source={{
                uri: user?.profileImageUrl,
              }}
              size='md'
            >
              NB
              <Avatar.Badge bg='green.500' size='23%' />
            </Avatar>
            <View>
              <Text className='ml-4 text-xl font-semibold text-slate-800'>
                Bonjour {user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}
              </Text>
              <Text className='ml-4 text-xs text-slate-700'>Découvre les nouvelles offres !</Text>
            </View>
          </View>
        )}
        <TextInput
          className='w-10/12 bg-white rounded-full shadow-sm px-4 py-3 mt-6'
          placeholder='Rechercher une plante'
          value={search}
          onChangeText={(value) => setSearch(value)}
          placeholderTextColor='#AFAFAF'
        />
      </LinearGradient>

      <ScrollView className='w-screen mb-20' showsVerticalScrollIndicator={false}>
        <View className='w-screen h-[20px]' />
        <View className='w-full'>
          <Text className='pl-5 text-lg '>⭐ Top planters</Text>
          <FlatList
            data={plantersData}
            renderItem={({ item }) => (
              <CardPlanter name={item.name} image={item.image} deals={item.deals} />
            )}
            keyExtractor={(item) => item.key}
            horizontal={true}
            contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
          />
        </View>

        {/* <View className='h-[50px] w-full' />

        <View className='w-full'>
          <Text className='pl-5 text-lg '>🎉 Super deals / ventes privées !</Text>
          <FlatList
            data={dealData}
            renderItem={({ item }) => (
              <CardDeal entreprise={item.entreprise} ville={item.ville} photo={item.photo} />
            )}
            keyExtractor={(item) => item.key}
            horizontal={true}
            contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
          />
        </View> */}

        <View className='h-[50px] w-full' />

        <View className='w-full'>
          <Text className='pl-5 text-lg w-full'>🍃 Catégories</Text>
          <FlatList
            data={categorieData}
            renderItem={({ item }) => <CardCategorie name={item.name} image={item.image} />}
            keyExtractor={(item) => item.key}
            horizontal={false}
            contentContainerStyle={{ padding: 20 }}
          />
        </View>
        <View className='w-full'>
          <Text className='pl-5 pb-4 text-lg w-full '>🔫 Ta plante au quotidien</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EntretienScreen')}
            className={`w-[100%] h-[120px] flex flex-row items-center bg-pink-100 rounded-lg mb-3 relative`}
          >
            <View className='w-6/12 h-full flex-row items-center'>
              <Text className='font-semibold text-slate-800	font-bold	text-xl ml-4'>
                Entretien 💊
              </Text>
            </View>

            <Image
              source={require('../../assets/03-removebg.png')}
              className='w-6/12 h-full rounded-lg'
              contentFit='cover'
            />
          </TouchableOpacity>
        </View>
        <View className='h-[50px] w-full' />

        <View className='w-full h-40'>
          <Text className='pl-5 text-lg mb-4'>⚡ Publicité</Text>
          <Image
            source='https://i.ibb.co/FWY0jhd/02-01-decouvrir-histoire-de-marseille.jpg'
            contentFit='cover'
            transition={1000}
            className='w-full h-full'
          />
        </View>

        <View className='h-[100px] w-full' />

        {/* <View className='w-full'>
          <Text className='pl-5 text-lg'>👀 À la une</Text>
          <FlatList
            data={plantesData}
            renderItem={({ item }) => (
              <CardProduct name={item.name} prix={item.prix} photo={item.photo} />
            )}
            keyExtractor={(item) => item.key}
            horizontal={true}
            contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
          />
        </View> */}

        <View className='h-[50px] w-full' />

        <View className='w-full'>
          <Text className='pl-5 text-lg'>👉 Suggestions de recherche</Text>
          <FlatList
            data={suggestionData}
            renderItem={({ item }) => <CardSuggestion search={item.search} views={item.views} />}
            keyExtractor={(item) => item.key}
            horizontal={true}
            contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
          />
        </View>

        <View className='h-[100px] w-full' />
      </ScrollView>
    </SafeAreaView>
    // </LinearGradient>
  )
}

export default HomeScreen
