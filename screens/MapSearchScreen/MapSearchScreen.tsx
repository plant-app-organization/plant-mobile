import React, { useState, useRef, useCallback, useEffect } from 'react'
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
  useWindowDimensions,
  Pressable,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { LinearGradient } from 'expo-linear-gradient'
import CardProduct from '../../components/product/CardProduct'
import { useSearchOffersQuery } from '../../graphql/graphql'
import { useReactiveVar } from '@apollo/client'
import { bookmarksVar } from '../../variables/bookmarks'
import LoadingView from '../../components/LoadingView/LoadingView'
import { MapIcon, ChevronDoubleRightIcon } from 'react-native-heroicons/solid'
import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'

interface MapSearchScreenProps {}

const MapSearchScreen: React.FunctionComponent<MapSearchScreenProps> = (props) => {
  // console.log('🏓🏓🏓🏓🏓props.route.params.filter in mapsearchscreen', props.route.params.filter)
  const [resultsDisplay, setResultsDisplay] = useState<string>('list')
  const [filters, setFilters] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [environment, setEnvironment] = useState<string>('')
  //offset and hasMore for infinite scroll
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const [refreshing, setRefreshing] = useState<boolean>(false)
  const {
    data: searchOffersData,
    refetch: refetchSearchOffersData,
    fetchMore,
  } = useSearchOffersQuery({
    variables: { searchInput, filters, environment, limit: 6, offset },
  })

  const fetchMoreData = () => {
    if (!hasMore) {
      return
    }

    fetchMore({
      variables: {
        offset: offset + 6,
      },
    }).then((fetchMoreResult) => {
      console.log('✨fetchMoreResult', fetchMoreResult)
      if (
        !fetchMoreResult.data.OffersListSearch ||
        fetchMoreResult.data.OffersListSearch.length === 0
      ) {
        setHasMore(false)
      }
      setOffset(offset + 6)
    })
  }
  console.log('🙂filters', filters)
  console.log('🤩environment', environment)
  const inputRef = useRef(null)

  const navigation = useNavigation()
  const { width, height } = useWindowDimensions()
  const isFocused = useIsFocused()

  // console.log('searchOffersData', searchOffersData)
  const renderItem = useCallback(({ item }) => <CardProduct {...item} />, [])
  const handleFilterPress = (filterValue: string) => {
    if (filterValue == 'all') {
      console.log('clic ALL')
      setFilters([])
      setEnvironment('')
      setHasMore(true)
      refetchSearchOffersData({ filters: [], environment: '', offset: 0, limit: 6 })
    } else {
      if (filters.some((e) => e === filterValue)) {
        setFilters(filters.filter((e) => e !== filterValue))
        setHasMore(true)
        setOffset(0)
        refetchSearchOffersData({
          environment,
          filters: filters.filter((e) => e !== filterValue),
          offset: 0,
          limit: 6,
        })
      } else {
        setFilters([...filters, filterValue])
        setHasMore(true)
        setOffset(0)
        refetchSearchOffersData({
          environment,
          filters: [...filters, filterValue],
          offset: 0,
          limit: 6,
        })
      }
    }
  }

  const handleEnvironmentPress = (environmentValue: string) => {
    if (environmentValue == 'indoor') {
      if (environment == 'indoorAndOutdoor') {
        setEnvironment('outdoor')
        setHasMore(true)

        refetchSearchOffersData({ filters, environment: 'indoor', offset: 0, limit: 6 })
      } else if (environment == 'indoor') {
        setEnvironment('')
        setHasMore(true)

        refetchSearchOffersData({ filters, environment: '', offset: 0, limit: 6 })
      } else if (environment == 'outdoor') {
        setEnvironment('indoorAndOutdoor')
        setHasMore(true)

        refetchSearchOffersData({ filters, environment: 'indoorAndOutdoor', offset: 0, limit: 6 })
      } else if (environment == '') {
        setEnvironment('indoor')
        setHasMore(true)

        refetchSearchOffersData({ filters, environment: 'indoor', offset: 0, limit: 6 })
      }
    } else if (environmentValue == 'outdoor') {
      if (environment == 'indoorAndOutdoor') {
        setEnvironment('indoor')
        setHasMore(true)

        refetchSearchOffersData({ filters, environment: 'outdoor', offset: 0, limit: 6 })
      } else if (environment == 'indoor') {
        setEnvironment('indoorAndOutdoor')
        setHasMore(true)

        refetchSearchOffersData({ filters, environment: 'indoorAndOutdoor', offset: 0, limit: 6 })
      } else if (environment == 'outdoor') {
        setEnvironment('indoorAndOutdoor')
        setHasMore(true)

        refetchSearchOffersData({ filters, environment: 'indoorAndOutdoor', offset: 0, limit: 6 })
      } else if (environment == '') {
        setEnvironment('outdoor')
        setHasMore(true)

        refetchSearchOffersData({ filters, environment: 'outdoor', offset: 0, limit: 6 })
      }
    }
  }
  useEffect(() => {
    props.route?.params?.comingFromHomeScreenInput == true
      ? inputRef.current?.focus()
      : console.log('not coming from homescreen')

    props.route?.params?.filter
      ? setFilters([props.route.params.filter])
      : console.log('PAS DE FILTRE DANS LA ROUTE')
  }, [isFocused])

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      console.log('environment', environment)
      refetchSearchOffersData({ filters, environment, offset: 0, limit: 6 }),
        setRefreshing(false),
        setOffset(0),
        setHasMore(true)
    })
  }, [])
  //
  let stylefilter = {}

  const onChangeText = (text: string) => {
    if (text.length > 2) {
      console.log('go', text)
    }
    setSearchInput(text)
  }

  // const filteredProducts = products.filter(filterProducts);
  const resultsContainer = (
    // <ScrollView
    //   showsVerticalScrollIndicator={false}
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={refreshing}
    //       onRefresh={onRefresh}
    //       tintColor='#87BC23'
    //       colors={['#87BC23', '#139DB8']}
    //     />
    //   }
    // >
    <View>
      {searchOffersData ? (
        <View className='w-screen bg-white'>
          <Text className='px-4 pb-2 pl-6 font-Roboto '>
            {searchOffersData?.OffersListSearch.length} résultats
          </Text>

          {resultsDisplay == 'list' ? (
            <FlatList
              style={{ marginBottom: 450 }}
              numColumns={2}
              // contentContainerStyle={{
              //   alignItems: 'flex-start',
              // }}
              onEndReached={fetchMoreData}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor='#87BC23'
                  colors={['#87BC23', '#139DB8']}
                />
              }
              onEndReachedThreshold={0.1} // The threshold at which the fetchMoreData function should be called. 0.5 means "when half of the list is remaining".
              horizontal={false}
              initialNumToRender={4}
              maxToRenderPerBatch={8}
              ItemSeparatorComponent={() => <View className='h-4' />}
              columnWrapperStyle={{
                flex: 1,
                alignItems: 'flex-start',
              }}
              data={searchOffersData?.OffersListSearch}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <MapView
              style={{ width: '100%', height: 700 }}
              provider={'google'}
              initialRegion={{
                latitude: 46.3396952,
                longitude: 2.6072057,
                latitudeDelta: 10,
                longitudeDelta: 10,
              }}
            >
              {searchOffersData.OffersListSearch.map((e, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: e.latitude,
                      longitude: e.longitude,
                    }}
                    pinColor='pink'
                  >
                    <Callout
                      style={{
                        width: 0.4 * width,
                        height: 0.25 * width,
                      }}
                      onPress={() => navigation.navigate('Listing', { listingData: e })}
                    >
                      <View className='flex flex-row justify-between'>
                        <View className='flex'>
                          <Text>{e.plantName}</Text>
                          <Text>{e.city}</Text>
                        </View>
                        <View className='flex'>
                          <Text className='font-bold'>{e.price} €</Text>
                        </View>
                      </View>
                      <View style={{ alignItems: 'center', alignContent: 'center' }}>
                        <Text>
                          slltlll
                          <Image
                            source={{ uri: e.pictures[0] }}
                            style={{ height: 200, width: 200, borderRadius: 5 }}
                            resizeMode='cover'
                          />
                        </Text>
                      </View>
                      <CalloutSubview
                        style={{
                          alignItems: 'flex-end',
                        }}
                        onPress={() => {
                          console.log('onPress Clicked')
                        }}
                      >
                        <ChevronDoubleRightIcon color={'black'} />
                      </CalloutSubview>
                    </Callout>
                  </Marker>
                )
              })}
            </MapView>
          )}
        </View>
      ) : (
        <View className='flex-1 w-screen h-screen '>
          <LoadingView />
        </View>
      )}
    </View>
    // </ScrollView>
  )

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#C0FFE7',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <LinearGradient
        colors={['#C0FFE7', 'white']}
        className='w-full '
        style={{ height: height * 0.18 }}
      >
        <View className=' mb-5 mt-5 justify-around'>
          <View className='flex flex-row justify-evenly pb-2'>
            <TouchableOpacity
              onPress={() => setResultsDisplay('list')}
              className={`${resultsDisplay == 'list' ? 'opacity-100' : 'opacity-70'}
              bg-white	border-solid rounded-md  p-2 mr-2 px-4 flex flex-row items-center`}
            >
              <Text className='font-Roboto'>Les annonces</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setResultsDisplay('map')}
              className={`${resultsDisplay == 'map' ? 'opacity-100' : 'opacity-70'}
        bg-white	border-solid rounded-md  p-1 mr-2 px-4 flex flex-row items-center opacity`}
            >
              <MapIcon color={'black'} />
              <Text className='font-Roboto ml-2'>Voir sur la carte</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            className='w-12/12 bg-white rounded-lg shadow-sm px-4 py-3 mt-6 mx-3 '
            placeholder='Rechercher une plante'
            value={searchInput}
            onChangeText={onChangeText}
            placeholderTextColor='#AFAFAF'
            ref={inputRef}
          />
          <View className='flex-row justify-around items-center w-full mt-10 '>
            <ScrollView
              className='w-screen pl-4'
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => handleFilterPress('all')}
                className={`${!filters.length && environment == '' && 'border'}
      bg-yellow-100	border-solid rounded-2xl  p-2 mr-2`}
              >
                <Text className='font-Roboto '>Tout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleEnvironmentPress('indoor')}
                className={`${
                  (environment == 'indoor' || environment === 'indoorAndOutdoor') && 'border'
                }
      bg-orange-100	 border-solid rounded-2xl  p-2 mr-2`}
              >
                <Text className='font-Roboto '>Plantes d'intérieur</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleEnvironmentPress('outdoor')}
                className={`${
                  (environment === 'outdoor' || environment === 'indoorAndOutdoor') && 'border'
                }
      bg-orange-100	 border-solid rounded-2xl  p-2 mr-2`}
              >
                <Text className='font-Roboto '>Plantes d'extérieur</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFilterPress('succulent')}
                className={`${filters.some((e) => e === 'succulent') && 'border'}
      bg-green-100	border-solid rounded-2xl  p-2 mr-2`}
              >
                <Text className='font-Roboto '>Plantes grasses</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFilterPress('rare')}
                className={`${filters.some((e) => e === 'rare') && 'border'}
      bg-blue-100	border-solid rounded-2xl  p-2 mr-2`}
              >
                <Text className='font-Roboto '>Rares</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleFilterPress('tropical')}
                className={`${filters.some((e) => e === 'tropical') && 'border'}
      bg-purple-100	 border-solid rounded-2xl  p-2 mr-2`}
              >
                <Text className='font-Roboto '>Tropicales</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFilterPress('kitchenGarden')}
                className={`${filters.some((e) => e === 'kitchenGarden') && 'border'}
      bg-green-100	border-solid rounded-2xl  p-2 mr-2`}
              >
                <Text className='font-Roboto '>Potager</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFilterPress('aromatic')}
                className={`${filters.some((e) => e === 'aromatic') && 'border'}
      bg-green-100	border-solid rounded-2xl  p-2 mr-2`}
              >
                <Text className='font-Roboto '>Aromatiques</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
      {resultsContainer}
    </SafeAreaView>
  )
}

export default MapSearchScreen
