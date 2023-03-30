import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, PixelRatio } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MapSearchScreen from '../screens/MapSearchScreen/MapSearchScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import AddScreen from '../screens/AddScreen/AddScreen';
import ListingScreen from '../screens/ListingScreen/ListingScreen';

import * as Animatable from 'react-native-animatable';
import { shouldInclude } from '@apollo/client/utilities';

const TabArr = [
  { route: 'Home', label: 'Accueil', icon: 'home', component: HomeScreen },
  {
    route: 'Search',
    label: 'Recherche',
    icon: 'search',
    component: MapSearchScreen,
  },
  { route: 'Add', label: 'Vendre', icon: 'plus', component: AddScreen },
  { route: 'Chat', label: 'Chat', icon: 'comment', component: ChatScreen },
  { route: 'Profile', label: 'Profil', icon: 'user-alt', component: ProfileScreen },
];

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 60,
        position: 'relative',
      },
    }}
  >
    <Tab.Screen
      name='Home'
      component={HomeScreen}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesome5 name='home' size={21} color={focused ? '#344E41' : '#9DB2CE'} />
            <Text style={{ color: focused ? '#344E41' : '#9DB2CE', fontSize: 12 }}>Accueil</Text>
          </View>
        ),
      }}
    />

    <Tab.Screen
      name='Search'
      component={MapSearchScreen}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesome5 name='search' size={21} color={focused ? '#344E41' : '#9DB2CE'} />
            <Text style={{ color: focused ? '#344E41' : '#9DB2CE', fontSize: 12 }}>Rechercher</Text>
          </View>
        ),
      }}
    />

    <Tab.Screen
      name='Add'
      component={AddScreen}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: focused ? '#C3E2D3' : 'white',
              width: 70,
              height: 70,
              borderRadius: '100%',
              position: 'absolute',
              bottom: 10,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#344E41',
                width: '90%',
                height: '90%',
                borderRadius: '100%',
              }}
            >
              <FontAwesome5 name='plus' size={21} color='white' />
              <Text style={{ color: 'white', fontSize: 10 }}>Vendre</Text>
            </View>
          </View>
        ),
      }}
    />

    <Tab.Screen
      name='Chat'
      component={ChatScreen}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesome5 name='comment' size={21} color={focused ? '#344E41' : '#9DB2CE'} />
            <Text style={{ color: focused ? '#344E41' : '#9DB2CE', fontSize: 12 }}>Chat</Text>
          </View>
        ),
      }}
    />

    <Tab.Screen
      name='Profile'
      component={ProfileScreen}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesome5 name='user-alt' size={21} color={focused ? '#344E41' : '#9DB2CE'} />
            <Text style={{ color: focused ? '#344E41' : '#9DB2CE', fontSize: 12 }}>Profile</Text>
          </View>
        ),
      }}
    />

    <Tab.Screen name='Listing' component={ListingScreen} options={{ tabBarButton: () => null }} />
  </Tab.Navigator>
);

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbarContainer: {
    flex: 1,
    paddingTop: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
