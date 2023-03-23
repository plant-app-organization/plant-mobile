import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

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
} from 'react-native';
import { Spinner, Switch } from 'native-base';

import CardProduct from '../../components/product/CardProduct';
import CardDeal from '../../components/super-deals/CardDeal';
import CardCategorie from '../../components/categories/CardCategorie';
import CardPlanter from '../../components/planters/CardPlanter';
import CardSuggestion from '../../components/suggestions/CardSuggestion';
// import CardAntigaspi from '../../components/antigaspi/CardAntigaspi';
import { Avatar } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { NoDeprecatedCustomRule } from 'graphql';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useUser } from '@clerk/clerk-expo';

interface HomeScreenProps {}
//
const HomeScreen: React.FunctionComponent<HomeScreenProps> = (props) => {
  const [search, setSearch] = useState<string>('');
  const { isSignedIn, user } = useUser();
  // const { getToken } = useAuth();

  // console.log('user clerk ', user);
  const plantesData: { name: string; prix: number; photo: string }[] = [
    {
      name: 'Montserrat1',
      prix: 60.0,
      photo: 'https://thumbs.dreamstime.com/z/plante-plante-green-flower-sun-summer-154287762.jpg',
    },
    {
      name: 'Ficus Lyrata',
      prix: 20.0,
      photo: 'https://i.ibb.co/sWBGrQs/un-mur-de-monstera-6107712.webp',
    },
    {
      name: 'Plante kinthia',
      prix: 38.0,
      photo: 'https://i.ibb.co/DGSMfwX/63b038b2f4d6638e12691a62097e9e24fa203426.jpg',
    },
    {
      name: 'Montserrat2',
      prix: 98.0,
      photo: 'https://i.ibb.co/zX3qTxG/69570f4534a4212babd87b1b4d7e08088435ab30.jpg',
    },
    {
      name: 'Montserrat3',
      prix: 18.0,
      photo: 'https://thumbs.dreamstime.com/z/plante-plante-green-flower-sun-summer-154287762.jpg',
    },
  ];

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
  ];

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
  ];

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
  ];

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
  ];

  const suggestion = suggestionData.map((data, i) => {
    return <CardSuggestion key={i} search={data.search} views={data.views} />;
  });

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
        colors={['#DFF5E6', '#EFFFFD', '#FEFFFF']}
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

      <ScrollView className='w-screen' showsVerticalScrollIndicator={false}>
        <View className='flex flex-column h-full justify-start items-start mb-20'>
          <View className='items-start justify-start pt-4 w-scree mb-2'>
            <View className='flex-column items-start w-screen'>
              <Text className='pt-4 pl-5 text-lg '>⭐ Top planters</Text>
              <FlatList
                data={plantersData}
                renderItem={({ item }) => (
                  <CardPlanter name={item.name} image={item.image} deals={item.deals} />
                )}
                keyExtractor={(item) => item.key}
                horizontal={true}
                contentContainerStyle={{ padding: 20 }}
              />
            </View>
          </View>

          <View className='h-[50px] w-full' />

          <View className='w-full'>
            <Text className='pl-5 text-lg '>🎉 Super deals / ventes privées !</Text>
            <FlatList
              data={dealData}
              renderItem={({ item }) => (
                <CardDeal entreprise={item.entreprise} ville={item.ville} photo={item.photo} />
              )}
              keyExtractor={(item) => item.key}
              horizontal={true}
              contentContainerStyle={{ padding: 20 }}
            />
          </View>

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

          {/* <View className='flex items-start justify-start pl-0 pt-4 w-full h-40 mb-6'>
            <View className='flex-column items-start w-full'>
              <Text className='pl-8 pb-4 text-lg '>⚡ Publicité</Text>
              <ImageBackground
                source={{
                  uri: 'https://i.ibb.co/FWY0jhd/02-01-decouvrir-histoire-de-marseille.jpg',
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'green',
                }}
                imageStyle={{ borderRadius: 30 / 2, opacity: 0.8 }}
              ></ImageBackground>
            </View>
          </View> */}
          <View className='h-[50px] w-full' />

          <View className='w-full'>
            <Text className='pl-5 text-lg '>👀 À la une</Text>
            <FlatList
              data={plantesData}
              renderItem={({ item }) => (
                <CardProduct name={item.name} prix={item.prix} photo={item.photo} />
              )}
              keyExtractor={(item) => item.key}
              horizontal={true}
              contentContainerStyle={{ padding: 20 }}
            />
          </View>

          <View className='h-[50px] w-full' />

          <View className='w-full'>
            <Text className='pl-5 text-lg'>👉 Suggestions de recherche</Text>
            <FlatList
              data={suggestionData}
              renderItem={({ item }) => <CardSuggestion search={item.search} views={item.views} />}
              keyExtractor={(item) => item.key}
              horizontal={true}
              contentContainerStyle={{ padding: 20 }}
            />
          </View>

          <View className='h-[100px] w-full' />
        </View>
      </ScrollView>
    </SafeAreaView>
    // </LinearGradient>
  );
};
const styles = StyleSheet.create({
  // background: {
  //   width: '100%',
  //   height: '100%',
  // },
});
export default HomeScreen;
