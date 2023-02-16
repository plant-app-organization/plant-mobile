import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { Spinner } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

interface SigninScreenProps {}

const SigninScreen: React.FunctionComponent<SigninScreenProps> = (props) => {
  return (
    <LinearGradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      style={styles.background}
    ></LinearGradient>
  );
};
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SigninScreen;
