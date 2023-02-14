import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, TextInput, ScrollView } from 'react-native';
import { Spinner } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import CardProduct from '../../components/product/CardProduct';

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
      photo: 'https://thumbs.dreamstime.com/z/plante-plante-green-flower-sun-summer-154287762.jpg',
    },
    {
      name: 'Plante kinthia',
      prix: '38.00€',
      photo: 'https://thumbs.dreamstime.com/z/plante-plante-green-flower-sun-summer-154287762.jpg',
    },
    {
      name: 'Montserrat2',
      prix: '98.00€',
      photo: 'https://thumbs.dreamstime.com/z/plante-plante-green-flower-sun-summer-154287762.jpg',
    },
    {
      name: 'Montserrat3',
      prix: '18.00€',
      photo: 'https://thumbs.dreamstime.com/z/plante-plante-green-flower-sun-summer-154287762.jpg',
    },
  ];

  const plantes = plantesData.map((data, i) => {
    return <CardProduct key={i} name={data.name} prix={data.prix} />;
  });

  return (
    <View className='flex flex-column h-full justify-start items-start mt-16'>
      <TextInput
        className=' flex w-full border-slate-200 border-solid rounded-2xl border ml-4 p-3'
        placeholder='Rechercher une plante directement'
        value={search}
        onChangeText={(value) => setSearch(value)}
      />

      <View className='flex items-start justify-start pl-6 pt-6 w-full'>
        <View className='flex flex-column items-start w-full'>
          <Text className='p-4'>👀 À la une</Text>
          <ScrollView className='w-full' horizontal={true} showsHorizontalScrollIndicator={false}>
            {plantes}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
