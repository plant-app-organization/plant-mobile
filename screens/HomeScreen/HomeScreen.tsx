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
} from 'react-native';
import { Spinner } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import CardProduct from '../../components/product/CardProduct';
import CardDeal from '../../components/super-deals/CardDeal';
import CardCategorie from '../../components/categories/CardCategorie';
import CardPlanter from '../../components/planters/CardPlanter';
import CardSuggestion from '../../components/suggestions/CardSuggestion';

import { LinearGradient } from 'expo-linear-gradient';
import { NoDeprecatedCustomRule } from 'graphql';

interface HomeScreenProps {}

const HomeScreen: React.FunctionComponent<HomeScreenProps> = (props) => {
  const [search, setSearch] = useState('');

  const plantesData = [
    {
      name: 'Montserrat1',
      prix: '60.00€',
      photo: 'https://thumbs.dreamstime.com/z/plante-plante-green-flower-sun-summer-154287762.jpg',
    },
    {
      name: 'Ficus Lyrata',
      prix: '20.00€',
      photo: 'https://thumbs.dreamstime.com/z/leaf-8852131.jpg',
    },
    {
      name: 'Plante kinthia',
      prix: '38.00€',
      photo:
        'https://thumbs.dreamstime.com/z/la-plante-creeper-verte-sur-un-mur-la-plante-creeper-verte-sur-un-mur-260939556.jpg',
    },
    {
      name: 'Montserrat2',
      prix: '98.00€',
      photo:
        'https://thumbs.dreamstime.com/z/mexican-shrimp-plant-justicia-brandegeeana-false-hop-camar%C3%A3o-vermelho-mexikanische-garnelenpflanze-zimmerhopfen-falscher-hopfen-251116260.jpg',
    },
    {
      name: 'Montserrat3',
      prix: '18.00€',
      photo: 'https://thumbs.dreamstime.com/z/plante-plante-green-flower-sun-summer-154287762.jpg',
    },
  ];

  const dealData = [
    {
      entreprise: 'Jardinerie Ricard',
      ville: 'Marseille',
      photo:
        'https://thumbs.dreamstime.com/z/flower-stand-paris-market-france-displays-variety-fresh-flowers-plants-available-street-downtown-38409363.jpg',
    },
    {
      entreprise: 'Truffaut',
      ville: 'Paris',
      photo: 'https://thumbs.dreamstime.com/z/flower-shop-colorful-35979320.jpg',
    },
    {
      entreprise: 'Jardiland',
      ville: 'Marseille',
      photo:
        'https://thumbs.dreamstime.com/z/flower-shop-owner-small-business-portrait-friendly-small-standing-front-counter-looking-camera-smiling-53055651.jpg',
    },
    {
      entreprise: 'MonJardin.COM',
      ville: 'Marseille',
      photo:
        'https://thumbs.dreamstime.com/z/flowers-outside-liberty-department-store-central-london-united-kingdom-august-th-109675225.jpg',
    },
  ];

  const categorieData = [
    {
      name: 'Tropicales',
      image: 'https://thumbs.dreamstime.com/z/drops-pion-petals-5770074.jpg',
    },
    {
      name: 'Rares',
      image:
        'https://thumbs.dreamstime.com/z/effect-zooming-out-camera-shooting-canada-effect-zooming-out-camera-shooting-269274681.jpg',
    },
    {
      name: 'du Potager',
      image:
        'https://thumbs.dreamstime.com/z/wisteria-trellis-ashikaga-flower-park-tochigi-japan-prefecture-famous-its-great-trees-over-years-old-110378460.jpg',
    },
    {
      name: 'Aromatiques',
      image: 'https://thumbs.dreamstime.com/z/wild-yellow-flowers-greenery-136934796.jpg',
    },
    {
      name: 'Cactus',
      image:
        'https://thumbs.dreamstime.com/z/hydrangea-flowers-green-house-doors-hydranegas-very-common-brittany-region-france-111255705.jpg',
    },
  ];

  const plantersData = [
    {
      name: 'Marie',
      deals: '1205 plantdeals',
      image:
        'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    {
      name: 'William',
      deals: '1123 plantdeals',
      image:
        'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80',
    },
    {
      name: 'Jardiland',
      deals: '1058 plantdeals',
      image: '',
    },
    {
      name: 'Lucas',
      deals: '978 plantdeals',
      image:
        'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    {
      name: 'Axel',
      deals: '898 plantdeals',
      image:
        'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      name: 'Gabriel',
      deals: '861 plantdeals',
      image:
        'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    },
    {
      name: 'Maxime',
      deals: '561 plantdeals',
      image:
        'https://thumbs.dreamstime.com/z/business-man-standing-confident-smile-portrait-successful-suit-smiling-proud-outdoors-44304293.jpg',
    },
  ];

  const suggestionData = [
    {
      recherche: 'Montserrat',
      vues: '171k vues',
    },
    {
      recherche: 'Cactus',
      vues: '121k vues',
    },
    {
      recherche: 'Lyrata',
      vues: '101k vues',
    },
    {
      recherche: 'Plantes grasses',
      vues: '99k vues',
    },
    {
      recherche: 'Olivier',
      vues: '69k vues',
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

  return (
    <ScrollView className='w-screen' showsVerticalScrollIndicator={false}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#f2fff3', '#bee6c2', '#f2fff3', '#f2fff3', '#f2fff3', '#bee6c2']}
        style={styles.background}
      >
        <SafeAreaView>
          <View className='flex flex-column h-full justify-start items-start mt-4'>
            <TextInput
              className='w-11/12 border-slate-200 border-solid rounded-2xl border ml-4 p-3 mr-4'
              placeholder='Rechercher une plante directement'
              value={search}
              onChangeText={(value) => setSearch(value)}
            />
            <View className='flex items-start justify-start pl-6 pt-4 w-screen'>
              <View className='flex-column items-start w-screen'>
                <Text className='p-4'>🎉 Super deals / ventes privées !</Text>
                <ScrollView
                  className='w-screen'
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {deals}
                </ScrollView>
              </View>
            </View>
            <View className='flex items-start justify-start pl-6 pt-4 w-screen'>
              <View className='flex-column items-start w-11/12'>
                <Text className='p-4'>🍃 Catégories</Text>
                {categories}
              </View>
            </View>
            <View className='flex items-start justify-start pl-0 pt-4 w-full h-40 mb-6'>
              <View className='flex-column items-start w-full'>
                <Text className='pl-8 pb-4'>⚡ Publicité</Text>
                <ImageBackground
                  source={{
                    uri: 'https://thumbs.dreamstime.com/z/ryazan-russia-june-mcdonalds-france-mcdo-mobile-app-display-tablet-pc-ryazan-russia-june-mcdonalds-france-mcdo-mobile-119891387.jpg',
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
            <View className='items-start justify-start pl-6 pt-16 w-full'>
              <View className='flex-column items-start w-full'>
                <Text className='p-4'>👀 À la une</Text>
                <ScrollView
                  className='w-full'
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {plantes}
                </ScrollView>
              </View>
            </View>
            <View className='items-start justify-start pl-4 pt-6 w-scree mb-2'>
              <View className='flex-column items-start w-screen'>
                <Text className='pt-4 pl-4'>⭐ Top planters</Text>
                <ScrollView
                  className='w-full pl-2 pt-1'
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {topplanters}
                </ScrollView>
              </View>
            </View>
            <View className='items-start justify-start pl-4 pt-6 w-scree mb-9'>
              <View className='flex-column items-start w-screen'>
                <Text className='pt-4 pb-4 pl-4'>👉 Suggestions de recherche</Text>
                <ScrollView
                  className='w-full pl-2 pt-1'
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {suggestion}
                </ScrollView>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
});
export default HomeScreen;
