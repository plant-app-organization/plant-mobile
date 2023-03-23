import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, PixelRatio } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MapSearchScreen from '../screens/MapSearchScreen/MapSearchScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import AddScreen from '../screens/AddScreen/AddScreen';
import PlantProfileScreen from '../screens/PlantProfileScreen/PlantProfileScreen';

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
  // {
  //   route: 'PlantProfile',
  //   label: 'Détails',
  //   icon: 'user-alt',
  //   component: PlantProfileScreen,
  // },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -14 },
  1: { scale: 1.2, translateY: -14 },
};
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } };

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton: any = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef: any = useRef(null);
  const circleRef: any = useRef(null);
  const textRef: any = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <Animatable.View ref={viewRef} duration={325} style={styles.navbarContainer}>
        <View style={[styles.btn, { borderWidth: focused ? 2 : 0, borderColor: '#ffffff' }]}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <FontAwesome5 name={item.icon} size={21} color={focused ? '#3FA96A' : '#ffffff'} />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 75,
      },
    }}
  >
    {TabArr.map((item, index) => {
      return (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      );
    })}
    <Tab.Screen
      name='PlantProfileScreen'
      component={PlantProfileScreen}
      options={{ tabBarButton: () => null }}
    />
  </Tab.Navigator>
);

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarContainer: {
    flex: 1,
    paddingTop: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 42,
    height: 42,
    borderRadius: 30,
    borderWidth: PixelRatio.roundToNearestPixel(1),
    borderColor: '#3FA96A',
    backgroundColor: '#ccedcf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#ccedcf',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccedcf',
    borderRadius: 25,
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    color: '#3FA96A',
    paddingTop: 5,
    fontFamily: 'antipasto',
    paddingBottom: 8,
  },
});
