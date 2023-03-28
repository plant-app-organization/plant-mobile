import React, { useState, useRef, useCallback } from 'react';
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
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardProduct from '../../components/product/CardProduct';
import { useSearchOffersQuery } from '../../graphql/graphql';
import LoadingView from '../../components/LoadingView/LoadingView';
interface MapSearchScreenProps {}

const MapSearchScreen: React.FunctionComponent<MapSearchScreenProps> = (props) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data: searchOffersData, refetch: refetchSearchOffersData } = useSearchOffersQuery({
    variables: { searchInput, filters },
  });
  console.log('🙂filters', filters);
  // console.log('searchOffersData', searchOffersData);
  const renderItem = useCallback(({ item }) => <CardProduct {...item} />, []);
  const handleFilterPress = (filterValue: string) => {
    if (filterValue == 'all') {
      setFilters([]);
      refetchSearchOffersData({ filters: [] });
    } else {
      if (filters.some((e) => e === filterValue)) {
        setFilters(filters.filter((e) => e !== filterValue));
        refetchSearchOffersData({ filters: filters.filter((e) => e !== filterValue) });
      } else {
        setFilters([...filters, filterValue]);
        refetchSearchOffersData({ filters: [...filters, filterValue] });
      }
    }
  };

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      refetchSearchOffersData(), setRefreshing(false);
    });
  }, []);
  //
  let stylefilter = {};

  const onChangeText = (text: string) => {
    if (text.length > 2) {
      console.log('go', text);
    }
    setSearchInput(text);
  };

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
              className='font-Roboto w-11/12 border-green-50 border-solid bg-green-100  text-left  rounded-2xl border ml-4 p-3 mr-4 mt-4'
              placeholder='Rechercher une plante'
              value={searchInput}
              onChangeText={onChangeText}
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
                  <Text className='font-Roboto '>Plante d'intérieur</Text>
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
              {searchOffersData ? (
                <View className='w-screen'>
                  <Text className='p-4 pl-6 font-Roboto '>
                    {searchOffersData?.OffersListSearch.length} résultats
                  </Text>
                  <View className='w-screen'>
                    <FlatList
                      numColumns={2}
                      horizontal={false}
                      initialNumToRender={4}
                      maxToRenderPerBatch={6}
                      ItemSeparatorComponent={() => <View className='h-4' />}
                      columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-evenly',
                      }}
                      data={searchOffersData?.OffersListSearch}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id}
                    />
                  </View>
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
