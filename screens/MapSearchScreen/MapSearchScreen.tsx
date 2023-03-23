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
import { LinearGradient } from 'expo-linear-gradient';
import CardProduct from '../../components/product/CardProduct';
import { useGetOffersQuery } from '../../graphql/graphql';
import LoadingView from '../../components/LoadingView/LoadingView';

interface MapSearchScreenProps {}

const MapSearchScreen: React.FunctionComponent<MapSearchScreenProps> = (props) => {
  const [filters, setFilters] = useState<string[]>([]);

  const { data: offersData, refetch: refetchOffersData } = useGetOffersQuery({
    variables: { filters },
  });
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  // const [selectedCategory, setSelectedCategory] = useState<string>('Toutes les catégories');
  console.log('🙂filters', filters);
  const handleFilterPress = (filterValue: string) => {
    if (filterValue == 'all') {
      setFilters([]);
      refetchOffersData({ filters: [] });
    } else {
      if (filters.some((e) => e === filterValue)) {
        setFilters(filters.filter((e) => e !== filterValue));
        refetchOffersData({ filters: filters.filter((e) => e !== filterValue) });
      } else {
        setFilters([...filters, filterValue]);
        refetchOffersData({ filters: [...filters, filterValue] });
      }
    }
  };
  // const filterProducts = (product) => {
  //   if (selectedCategory === 'Toutes les catégories') {
  //     return true;
  //   } else {
  //     return product.categorie === selectedCategory;
  //   }
  // };
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
        colors={[
          '#f2fff3',
          '#e2f7f6',
          '#f0fafb',
          '#fdf5fb',
          '#f2fff3',
          '#e2f7f6',
          '#f0fafb',
          '#fdf5fb',
        ]}
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
              className='font-Roboto w-11/12 border-green-50 border-solid bg-green-100 border text-left border-solid rounded-2xl border ml-4 p-3 mr-4 mt-4'
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
                  onPress={() => setFilters([])}
                  className={`${!filters.length && 'bg-green-100'}
                  text-white	border-slate-400 border-solid rounded-2xl border p-2 mr-2`}
                >
                  <Text className='font-Roboto '>Toutes les catégories</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFilterPress('succulent')}
                  className={`${filters.some((e) => e === 'succulent') && 'bg-green-100'}
                  text-white	border-slate-400 border-solid rounded-2xl border p-2 mr-2`}
                >
                  <Text className='font-Roboto '>Plantes grasses</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFilterPress('rare')}
                  className={`${filters.some((e) => e === 'rare') && 'bg-green-100'}
                  text-white	border-slate-400 border-solid rounded-2xl border p-2 mr-2`}
                >
                  <Text className='font-Roboto '>Rares</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFilterPress('interior')}
                  className={`${filters.some((e) => e === 'interior') && 'bg-green-100'}
                  text-white	border-slate-400 border-solid rounded-2xl border p-2 mr-2`}
                >
                  <Text className='font-Roboto '>Plante d'intérieurs</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFilterPress('tropical')}
                  className={`${filters.some((e) => e === 'tropical') && 'bg-green-100'}
                  text-white	border-slate-400 border-solid rounded-2xl border p-2 mr-2`}
                >
                  <Text className='font-Roboto '>Tropicales</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View className='items-start justify-start pt-0'>
              {offersData ? (
                <View className='w-screen '>
                  <Text className='p-4 pl-6 font-Roboto '>
                    {offersData?.OffersList.length} résultats
                  </Text>
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
                  </View>:
                </View>
              ) : (
                <View className='flex-1 w-screen '>
                  <LoadingView />
                </View>
              )}
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
