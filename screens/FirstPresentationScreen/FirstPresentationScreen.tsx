import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

interface FirstPresentationScreenProps {}

const FirstPresentationScreen: React.FunctionComponent<FirstPresentationScreenProps> = (props) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.titre}>
          <Text style={styles.text1}>Plante.</Text>
          <Text style={styles.text2}>Découvrez, achetez, vendez</Text>
        </View>
        <Image style={styles.image} source={require('../../assets/logo.png')} />
        <View style={styles.paragraphe}>
          <Text style={styles.text3}>
            Achetez, vendez ou echangez vos <Text style={styles.text3}>plantes</Text> pour leur
            offrir une <Text style={styles.text4}> nouvelles vie</Text> 🌱
          </Text>
          <View style={styles.feet}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('SecondPresentationScreen')}
            >
              <Text style={styles.textButton}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 40,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 25,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  text1: {
    fontFamily: 'Gentle',
    color: '#3FA96A',
    fontSize: 25,
  },
  text2: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'antipasto',
  },
  text3: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'antipasto',
    marginTop: 40,
    lineHeight: 30,
  },
  text4: {
    color: '#25663f',
    fontSize: 25,
    fontFamily: 'antipasto',
  },
  image: {
    width: '70%',
    height: '30%',
    marginTop: 10,
    borderRadius: 25,
    // marginBottom: 10,
  },
  titre: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraphe: {
    // marginBottom: 100,
    // backgroundColor: 'black',
  },
  feet: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: 50,
  },
  button: {
    height: 40,
    width: 200,
    borderRadius: 25,
    backgroundColor: '#bee6c2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textButton: {
    color: 'black',
  },
});

export default FirstPresentationScreen;
