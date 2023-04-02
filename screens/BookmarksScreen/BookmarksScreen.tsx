import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  FlatList,
  StatusBar,
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
import { useReactiveVar } from '@apollo/client';
import { bookmarksVar } from '../../variables/bookmarks';
import { LinearGradient } from 'expo-linear-gradient';
import CardProduct from '../../components/product/CardProduct';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface FavorisScreenProps {}

const FavorisScreen: React.FunctionComponent<FavorisScreenProps> = (props) => {
  const navigation = useNavigation();

  const userBookmarks = useReactiveVar(bookmarksVar);
  // console.log('userBookmarks in Bookmarksscreen', userBookmarks);

  const bookmarksCards = userBookmarks.map((data, i) => {
    return <CardProduct key={i} {...data} isBookmarked={true} />;
  });
  const renderItem = useCallback(({ item }) => <CardProduct {...item} isBookmarked={true} />, []);

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
              <Text className='p-4 pl-6'>{userBookmarks?.length} Annonces dans vos favoris</Text>
              <View className='w-screen'>
                <FlatList
                  numColumns={2}
                  horizontal={false}
                  initialNumToRender={4}
                  maxToRenderPerBatch={6}
                  ItemSeparatorComponent={() => <View className='h-4' />}
                  columnWrapperStyle={{
                    flex: 1,
                    alignItems: 'flex-start',
                  }}
                  data={userBookmarks}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
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
