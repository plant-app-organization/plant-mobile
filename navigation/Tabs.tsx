import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  MagnifyingGlassCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import { PlusCircleIcon as PlusCircleIconOutline } from 'react-native-heroicons/outline';
import { Text } from 'react-native';
import { BottomTabNavigatorParamList } from './types';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MapSearchScreen from '../screens/MapSearchScreen/MapSearchScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import AddScreen from '../screens/AddScreen/AddScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomeScreen') {
            return <HomeIcon size={size} color={color} />;
          } else if (route.name === 'ChatScreen') {
            return <ChatBubbleBottomCenterTextIcon size={size} color={color} />;
          } else if (route.name === 'ProfileScreen') {
            return <UserIcon size={size} color={color} />;
          } else if (route.name === 'AddScreen') {
            return <PlusCircleIconOutline size={size * 1.5} color={color} />;
          } else if (route.name === 'MapSearchScreen') {
            return <MagnifyingGlassCircleIcon size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#8CE795',
        tabBarInactiveTintColor: '#3FA96A',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        unmountOnBlur: false,
      })}
    >
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name='MapSearchScreen'
        component={MapSearchScreen}
        options={{
          tabBarLabel: 'recherche',
        }}
      />
      <Tab.Screen
        name='AddScreen'
        component={AddScreen}
        options={{
          tabBarLabel: 'Publier',
        }}
      />
      <Tab.Screen
        name='ChatScreen'
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
      <Tab.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
