import React, { useState, useRef, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface FirstScreenLogoProps {}

const FirstScreenLogo: React.FunctionComponent<FirstScreenLogoProps> = (props) => {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      style={styles.background}
    >
      <Text style={styles.text}>Plante.</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Recoleta',
    color: 'white',
    fontSize: 55,
  },
});
export default FirstScreenLogo;
