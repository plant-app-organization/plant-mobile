import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

interface SecondPresentationScreenProps {}

const SecondPresentationScreen: React.FunctionComponent<SecondPresentationScreenProps> = (
  props,
) => {
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
        <Image style={styles.image} source={require('../../assets/logo2.png')} />
        <View style={styles.paragraphe}>
          <Text style={styles.text3}>
            Faites un geste pour la <Text style={styles.text4}>planète</Text> : achetez{' '}
            <Text style={styles.text4}>local</Text> et luttez contre le{' '}
            <Text style={styles.text4}>gaspillage</Text>
          </Text>
          <View style={styles.feet}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('BottomTabs')}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 40,

    paddingTop: 25,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  text1: {
    fontFamily: 'Gentle', // Custom font family
    color: '#3FA96A', // White color
    fontSize: 25, // 60 font size
  },
  text2: {
    color: 'white', // Green color
    fontSize: 15, // 20 font size
    fontFamily: 'antipasto', // Custom font family
  },

  text3: {
    color: 'black', // Green color
    fontSize: 25, // 20 font size
    fontFamily: 'antipasto', // Custom font family
    marginTop: 40, // Top margin of -8
    lineHeight: 30,
  },
  text4: {
    color: '#25663f', // Green color
    fontSize: 25, // 20 font size
    fontFamily: 'antipasto', // Custom font family
  },
  image: {
    width: '70%',
    height: '30%',
    marginTop: 80, // Top margin of -8
    borderRadius: 25,
  },

  titre: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraphe: {
    // paddingBottom: 50,
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

export default SecondPresentationScreen;
