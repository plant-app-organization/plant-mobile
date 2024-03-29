import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect, useRef } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  PixelRatio,
  useWindowDimensions,
  Platform,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen/HomeScreen'
import MapSearchScreen from '../screens/MapSearchScreen/MapSearchScreen'
import ChatScreen from '../screens/ChatScreen/ChatScreen'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import AddNewOfferStep1Screen from '../screens/AddNewOffer/AddNewOfferStep1Screen'
import ListingScreen from '../screens/ListingScreen/ListingScreen'
import InboxScreen from '../screens/InboxScreen/InboxScreen'

import * as Animatable from 'react-native-animatable'
import { shouldInclude } from '@apollo/client/utilities'
import FormStackNavigator from './FormStack'

const TabArr = [
  { route: 'Home', label: 'Accueil', icon: 'home', component: HomeScreen },
  {
    route: 'Search',
    label: 'Recherche',
    icon: 'search',
    component: MapSearchScreen,
  },
  { route: 'Add', label: 'Vendre', icon: 'plus', component: AddNewOfferStep1Screen },
  { route: 'Chat', label: 'Chat', icon: 'comment', component: ChatScreen },
  { route: 'Profile', label: 'Profil', icon: 'user-alt', component: ProfileScreen },
]

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  const { width, height } = useWindowDimensions()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: 80,
          position: 'relative',
          width: width,
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: width * 0.25 }}>
              <FontAwesome5 name='home' size={21} color={focused ? '#223726' : '#73859e'} />
              <Text style={{ color: focused ? '#223726' : '#73859e', fontSize: 12 }}>Accueil</Text>
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
            <View style={{ alignItems: 'center', justifyContent: 'center', width: width * 0.25 }}>
              <FontAwesome5 name='search' size={21} color={focused ? '#223726' : '#73859e'} />
              <Text style={{ color: focused ? '#223726' : '#73859e', fontSize: 12 }}>
                Rechercher
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name='Add'
        component={FormStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault()

            // Reset the stack navigator to its initial screen
            navigation.navigate('Add', {
              screen: 'AddNewOfferStep1Screen',
            })
          },
        })}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: focused ? '#A0C7AC' : '#A0C7AC',
                width: 70,
                height: 70,
                borderRadius: 100,
                position: 'absolute',
                bottom: 10,
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#223726',
                  width: '90%',
                  height: '90%',
                  borderRadius: 200,
                }}
              >
                <FontAwesome5 name='leaf' size={21} color='white' />
                <Text style={{ color: 'white', fontSize: 10 }}>Vendre</Text>
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name='Chat'
        component={InboxScreen}
        options={{
          tabBarBadge: 2,
          tabBarBadgeStyle: {
            backgroundColor: '#BFE6CB',
            fontSize: 9,
            color: '#1E293B',
            padding: 0,
            maxWidth: 15,
            minWidth: 15,
            minHeight: 15,
            maxHeight: 15,
            lineHeight: 15,
            alignSelf: undefined,
          },

          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: width * 0.25 }}>
              <FontAwesome5 name='comment' size={21} color={focused ? '#223726' : '#73859e'} />
              <Text style={{ color: focused ? '#223726' : '#73859e', fontSize: 12 }}>Chat</Text>
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
            <View style={{ alignItems: 'center', justifyContent: 'center', width: width * 0.25 }}>
              <FontAwesome5 name='user-alt' size={21} color={focused ? '#223726' : '#73859e'} />
              <Text style={{ color: focused ? '#223726' : '#73859e', fontSize: 12 }}>Profile</Text>
            </View>
          ),
        }}
      />

      {/* <Tab.Screen name='Listing' component={ListingScreen} options={{ tabBarButton: () => null }} /> */}
    </Tab.Navigator>
  )
}

export default BottomTabs

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
})
