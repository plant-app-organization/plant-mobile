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
} from 'react-native';
import { Spinner } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import CardProduct from '../../components/product/CardProduct';

interface MapSearchScreenProps {}

const MapSearchScreen: React.FunctionComponent<MapSearchScreenProps> = (props) => {
  const [search, setSearch] = useState<string>('');

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

  const plantes = plantesData.map((data, i) => {
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
          <TextInput
            className='w-11/12 border-slate-400 border-solid rounded-2xl border ml-4 p-3 mr-4 mt-4'
            placeholder='Rechercher une plante directement'
            value={search}
            onChangeText={(value) => setSearch(value)}
            placeholderTextColor='#000'
          />
          <View className='items-start justify-start pt-4'>
            <View className='w-full'>
              <Text className='p-4 pl-8'>👀 À la une</Text>
              <ScrollView className='pl-6' showsHorizontalScrollIndicator={false}>
                <View className='flex-row flex-wrap mr-12 w-screen'>{plantes}</View>
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
