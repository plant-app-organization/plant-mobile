import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Spinner } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import CardProduct from '../../components/product/CardProduct';
import { useGetOffersQuery } from '../../graphql/graphql';

interface MapSearchScreenProps {}

const MapSearchScreen: React.FunctionComponent<MapSearchScreenProps> = (props) => {
  const { data: offersData, refetch: refetchOffersData } = useGetOffersQuery();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes les catégories');

  const filterProducts = (product) => {
    if (selectedCategory === 'Toutes les catégories') {
      return true;
    } else {
      return product.categorie === selectedCategory;
    }
  };
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      refetchOffersData(), setRefreshing(false);
    });
  }, []);

  let stylefilter = {};

  // const filteredProducts = products.filter(filterProducts);

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
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor='#87BC23'
                colors={['#87BC23', '#139DB8']}
              />
            }
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
                <Text className='p-4 pl-6'>{offersData?.OffersList.length} résultats</Text>
                <View className='pl-6 w-screen'>
                  <View className='w-screen flex-row flex-wrap'>
                    {offersData?.OffersList.map((offer, i) => {
                      return (
                        <CardProduct
                          key={i}
                          name={offer.plantName}
                          prix={offer.price}
                          photo={offer.pictures[0]}
                        />
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
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
