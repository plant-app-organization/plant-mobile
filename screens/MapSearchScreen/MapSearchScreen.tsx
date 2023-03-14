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
  Button,
} from 'react-native';
import { Spinner } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import CardProduct from '../../components/product/CardProduct';

interface MapSearchScreenProps {}

const MapSearchScreen: React.FunctionComponent<MapSearchScreenProps> = (props) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes les catégories');

  const products: { name: string; prix: number; photo: string; categorie: string }[] = [
    {
      name: 'Montserrat1',
      prix: 60.0,
      photo: 'https://thumbs.dreamstime.com/z/plante-plante-green-flower-sun-summer-154287762.jpg',
      categorie: 'plante grasse',
    },
    {
      name: 'Ficus Lyrata',
      prix: 20.0,
      photo: 'https://i.ibb.co/sWBGrQs/un-mur-de-monstera-6107712.webp',
      categorie: 'plante rare',
    },
    {
      name: 'Plante kinthia',
      prix: 38.0,
      photo: 'https://i.ibb.co/DGSMfwX/63b038b2f4d6638e12691a62097e9e24fa203426.jpg',
      categorie: 'plante grasse',
    },
    {
      name: 'Montserrat2',
      prix: 98.0,
      photo: 'https://i.ibb.co/zX3qTxG/69570f4534a4212babd87b1b4d7e08088435ab30.jpg',
      categorie: 'plante rare',
    },
    {
      name: 'Montserrat3',
      prix: 18.0,
      photo: 'https://thumbs.dreamstime.com/z/plante-plante-green-flower-sun-summer-154287762.jpg',
      categorie: 'plante rare',
    },
    {
      name: 'Plante kinthia',
      prix: 38.0,
      photo: 'https://i.ibb.co/DGSMfwX/63b038b2f4d6638e12691a62097e9e24fa203426.jpg',
      categorie: 'plante rare',
    },
    {
      name: 'Plante kinthia',
      prix: 38.0,
      photo: 'https://i.ibb.co/DGSMfwX/63b038b2f4d6638e12691a62097e9e24fa203426.jpg',
      categorie: 'plante rare',
    },
    {
      name: 'Plante kinthia',
      prix: 38.0,
      photo: 'https://i.ibb.co/DGSMfwX/63b038b2f4d6638e12691a62097e9e24fa203426.jpg',
      categorie: 'plante grasse',
    },
    {
      name: 'Plante kinthia',
      prix: 38.0,
      photo: 'https://i.ibb.co/DGSMfwX/63b038b2f4d6638e12691a62097e9e24fa203426.jpg',
      categorie: 'plante grasse',
    },
    {
      name: 'Plante kinthia',
      prix: 38.0,
      photo: 'https://i.ibb.co/DGSMfwX/63b038b2f4d6638e12691a62097e9e24fa203426.jpg',
      categorie: 'plante grasse',
    },
    {
      name: 'Plante kinthia',
      prix: 38.0,
      photo: 'https://i.ibb.co/DGSMfwX/63b038b2f4d6638e12691a62097e9e24fa203426.jpg',
      categorie: 'plante grasse',
    },
    {
      name: 'Plante kinthia',
      prix: 38.0,
      photo: 'https://i.ibb.co/DGSMfwX/63b038b2f4d6638e12691a62097e9e24fa203426.jpg',
      categorie: 'plante grasse',
    },
    {
      name: 'Plante kinthia',
      prix: 38.0,
      photo: 'https://i.ibb.co/DGSMfwX/63b038b2f4d6638e12691a62097e9e24fa203426.jpg',
      categorie: 'plante grasse',
    },
    {
      name: 'Plante kinthia',
      prix: 38.0,
      photo: 'https://i.ibb.co/DGSMfwX/63b038b2f4d6638e12691a62097e9e24fa203426.jpg',
      categorie: 'plante grasse',
    },
  ];

  const filterProducts = (product) => {
    if (selectedCategory === 'Toutes les catégories') {
      return true;
    } else {
      return product.categorie === selectedCategory;
    }
  };

  let stylefilter = {};

  const filteredProducts = products.filter(filterProducts);

  const plantes = filteredProducts.map((data, i) => {
    return <CardProduct key={i} name={data.name} prix={data.prix} photo={data.photo} />;
  });

  return (
    <View className='w-screen'>
      <LinearGradient
        // Background Linear Gradient
        colors={['#f2fff3', '#bee6c2', '#f2fff3', '#f2fff3', '#f2fff3', '#bee6c2']}
        style={styles.background}
      >
        <SafeAreaView
          style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        >
          <TextInput
            className='w-11/12 border-green-50 border-solid bg-green-100 border text-left border-solid rounded-2xl border ml-4 p-3 mr-4 mt-4'
            placeholder='Rechercher une plante directement'
            value={search}
            onChangeText={(value) => setSearch(value)}
            placeholderTextColor='#000'
          />

          <View className='flex-row justify-around items-center w-full pt-4'>
            <ScrollView
              className='w-screen pl-4'
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => setSelectedCategory('Toutes les catégories')}
                className='bg-transparent border-green-50 border-solid bg-green-100 border text-left border-solid rounded-2xl border p-2 mr-2'
              >
                <Text>Toutes les catégories</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCategory('plante grasse')}
                className='bg-transparent text-white	border-slate-400 border-solid rounded-2xl border p-2 mr-2'
              >
                <Text>Plantes grasses</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCategory('plante rare')}
                className='bg-transparent text-white	border-slate-400 border-solid rounded-2xl border p-2 mr-2'
              >
                <Text>Plantes rares</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCategory('plante int')}
                className='bg-transparent text-white	border-slate-400 border-solid rounded-2xl border p-2 mr-2'
              >
                <Text>Plante d'intérieurs</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View className='items-start justify-start pt-0'>
            <View className='w-screen '>
              <Text className='p-4 pl-6'>{plantes.length}+ résultats</Text>
              <ScrollView className='pl-6 w-screen' showsHorizontalScrollIndicator={false}>
                <View className='w-screen flex-row flex-wrap'>{plantes}</View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

export default MapSearchScreen;
