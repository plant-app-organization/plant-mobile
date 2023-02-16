import React, { useState, useRef, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface FirstScreenLogoProps {}

const FirstScreenLogo: React.FunctionComponent<FirstScreenLogoProps> = (props) => {
  return (
    <LinearGradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      style={styles.background}
    >
      <Text style={styles.text1}>Plante.</Text>

      <Text style={styles.text2}>Seconde vie</Text>
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
  text1: {
    fontFamily: 'Gentle', // Custom font family
    color: 'white', // White color
    fontSize: 60, // 60 font size
  },
  text2: {
    color: '#3FA96A', // Green color
    fontSize: 25, // 20 font size
    marginTop: -15, // Top margin of -8
    fontFamily: 'LANENAR', // Custom font family
  },
});

export default FirstScreenLogo;
