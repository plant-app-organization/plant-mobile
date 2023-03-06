import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Spinner, Switch } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import CardProduct from '../../components/product/CardProduct';
import CardDeal from '../../components/super-deals/CardDeal';
import CardCategorie from '../../components/categories/CardCategorie';
import CardPlanter from '../../components/planters/CardPlanter';
import CardSuggestion from '../../components/suggestions/CardSuggestion';
import CardAntigaspi from '../../components/antigaspi/CardAntigaspi';
import { Avatar } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { NoDeprecatedCustomRule } from 'graphql';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';

interface HomeScreenProps {}
//
const HomeScreen: React.FunctionComponent<HomeScreenProps> = (props) => {
  const [search, setSearch] = useState<string>('');
  const { isSignedIn, user } = useUser();
  console.log('user clerk ', user);
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

  const antigaspiData: { entreprise: string; ville: string; panier: string; photo: string }[] = [
    {
      entreprise: 'Petit Fleuriste Vauban',
      ville: 'Marseille',
      panier: '5 dès 8.99€',

      photo:
        'https://i.ibb.co/wND4G6c/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-90935e01-c32d-428b-9e32-5d8929c45a5.png',
    },
    {
      entreprise: 'Fleurette13',
      ville: 'Marseille',
      panier: '3 dès 4.99€',
      photo:
        'https://i.ibb.co/CKgsZ9v/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-0e9fca9d-9962-47db-824e-ec52ca710d5.png',
    },
    {
      entreprise: 'Jardinerie Ricard',
      ville: 'Marseille',
      panier: '2 dès 3.99€',

      photo:
        'https://i.ibb.co/km3V7wX/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-79207055-49ff-4af2-94bb-d4589ab29ca.png',
    },
    {
      entreprise: 'Truffaut',
      ville: 'Paris',
      panier: '6 dès 6.99€',

      photo:
        'https://i.ibb.co/q1SWKj9/mathisdemo-create-realistic-plante-image-realistic-3-D-with-whit-5c0360d4-18f0-4798-8de9-1f081e263d5.png',
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

  const suggestionData: { recherche: string; vues: number }[] = [
    {
      recherche: 'Montserrat',
      vues: 171,
    },
    {
      recherche: 'Cactus',
      vues: 121,
    },
    {
      recherche: 'Lyrata',
      vues: 101,
    },
    {
      recherche: 'Plantes grasses',
      vues: 99,
    },
    {
      recherche: 'Olivier',
      vues: 69,
    },
  ];

  const plantes = plantesData.map((data, i) => {
    return <CardProduct key={i} name={data.name} prix={data.prix} photo={data.photo} />;
  });

  const deals = dealData.map((data, i) => {
    return <CardDeal key={i} entreprise={data.entreprise} ville={data.ville} photo={data.photo} />;
  });

  const categories = categorieData.map((data, i) => {
    return <CardCategorie key={i} name={data.name} image={data.image} />;
  });

  const topplanters = plantersData.map((data, i) => {
    return <CardPlanter key={i} name={data.name} deals={data.deals} image={data.image} />;
  });

  const suggestion = suggestionData.map((data, i) => {
    return <CardSuggestion key={i} recherche={data.recherche} vues={data.vues} />;
  });

  const antigaspi = antigaspiData.map((data, i) => {
    return (
      <CardAntigaspi
        key={i}
        entreprise={data.entreprise}
        ville={data.ville}
        panier={data.panier}
        photo={data.photo}
      />
    );
  });
  const { width, height } = useWindowDimensions();

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#f2fff3', '#bee6c2', '#f2fff3', '#f2fff3', '#f2fff3', '#bee6c2']}
      style={styles.background}
    >
      <SafeAreaView>
        <ScrollView className='w-screen' showsVerticalScrollIndicator={false}>
          <View className='flex flex-column h-full justify-start items-start mt-4'>
            {isSignedIn && (
              <View className='flex-row justify-around w-full items-center '>
                <View>
                  <Avatar
                    style={{}}
                    bg='amber.500'
                    source={{
                      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    }}
                    size='lg'
                  >
                    NB
                    <Avatar.Badge bg='green.500' size='23%' />
                  </Avatar>
                  <Text style={{ fontFamily: 'antipasto', fontSize: 18 }}>{user?.username} 👋</Text>
                </View>
                <View>
                  <Text style={{ fontFamily: 'antipasto', fontSize: 18 }}>infos🪴</Text>
                </View>
              </View>
            )}
            <TextInput
              className='w-11/12 border-green-50 border-solid bg-green-100 border text-left font-antipasto border-solid rounded-2xl border ml-4 p-3 mr-4 mt-4'
              placeholder='Rechercher une plante directement'
              value={search}
              onChangeText={(value) => setSearch(value)}
              placeholderTextColor='#000'
            />
            <View className='items-start justify-start pt-4 w-scree mb-2'>
              <View className='flex-column items-start w-screen'>
                <Text className='pt-4 pl-8 font-antipasto text-lg '>⭐ Top planters</Text>
                <ScrollView
                  className='w-full pl-2 pt-1 pl-6'
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {topplanters}
                </ScrollView>
              </View>
            </View>
            <View className='flex items-start justify-start pt-4 w-screen'>
              <View className='flex-column items-start w-screen'>
                <Text className='p-4 pl-8 font-antipasto text-lg '>
                  🎉 Super deals / ventes privées !
                </Text>
                <ScrollView
                  className='w-screen pl-6'
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {deals}
                </ScrollView>
              </View>
            </View>
            <View className='flex items-start justify-start pt-4 w-screen'>
              <View className='flex-column items-start w-screen'>
                <Text className='p-4 pl-8 font-antipasto text-lg '>🌎 Planète antigaspi</Text>
                <ScrollView
                  className='w-screen pl-6'
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {antigaspi}
                </ScrollView>
              </View>
            </View>

            <View className='flex items-start justify-start pl-6 pt-4 w-screen'>
              <View className='flex-column items-start w-11/12'>
                <Text className='p-4 font-antipasto text-lg '>🍃 Catégories</Text>
                {categories}
              </View>
            </View>
            <View className='flex items-start justify-start pl-0 pt-4 w-full h-40 mb-6'>
              <View className='flex-column items-start w-full'>
                <Text className='pl-8 pb-4 font-antipasto text-lg '>⚡ Publicité</Text>
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
            </View>
            <View className='items-start justify-start pt-16 w-full'>
              <View className='flex-column items-start w-full'>
                <Text className='p-4 pl-8 font-antipasto text-lg '>👀 À la une</Text>
                <ScrollView
                  className='w-full pl-6'
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {plantes}
                </ScrollView>
              </View>
            </View>

            <View className='items-start justify-start pt-6 w-scree mb-9'>
              <View className='flex-column items-start w-screen'>
                <Text className='pt-4 pb-4 pl-6 font-antipasto text-lg '>
                  👉 Suggestions de recherche
                </Text>
                <ScrollView
                  className='w-full pl-6 pt-1 '
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {suggestion}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
});
export default HomeScreen;
