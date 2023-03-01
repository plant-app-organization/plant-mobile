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
  Button,
} from 'react-native';
import { Spinner } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import CardProduct from '../../components/product/CardProduct';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface FavorisScreenProps {}

const FavorisScreen: React.FunctionComponent<FavorisScreenProps> = (props) => {
  const navigation = useNavigation();

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

  const plantes = products.map((data, i) => {
    return <CardProduct key={i} name={data.name} prix={data.prix} photo={data.photo} />;
  });

  return (
    <View className='w-screen'>
      <LinearGradient
        // Background Linear Gradient
        colors={['#f2fff3', '#bee6c2', '#f2fff3', '#f2fff3', '#f2fff3', '#bee6c2']}
        style={styles.background}
      >
        <SafeAreaView>
          <View className='flex-row pl-6 pr-6 pb-2 items-center justify-between w-full'>
            <TouchableOpacity
              onPress={() => navigation.navigate('BottomTabs', { screen: 'Profile' })}
            >
              <FontAwesomeIcon name='angle-left' size={24} />
            </TouchableOpacity>
            <Text className='text-black text-center font-antipasto text-lg'>Mes Favoris</Text>
            <FontAwesomeIcon name='heart' size={18} />
          </View>

          <View className='items-start justify-start pt-0'>
            <View className='w-full'>
              <Text className='p-4 pl-6'>{plantes.length}+ résultats</Text>
              <ScrollView className='pl-6 w-screen' showsHorizontalScrollIndicator={false}>
                <View className='flex-row flex-wrap justify-center'>{plantes}</View>
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

export default FavorisScreen;
