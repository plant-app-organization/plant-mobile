import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Spinner } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Box } from 'native-base';

interface SignupScreenProps {}

const SignupScreen: React.FunctionComponent<SignupScreenProps> = (props) => {
  const [nom, setNom] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [motDePasse, setMotDePasse] = useState<string>('');

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
        <Text style={styles.titre2}>S'inscrire</Text>
        <View style={styles.bloc}>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Nom</Text>
            </View>
            <TextInput style={styles.input} value={nom} onChangeText={setNom} />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Email</Text>
            </View>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Mot de passe</Text>
            </View>
            <TextInput style={styles.input} value={motDePasse} onChangeText={setMotDePasse} />
          </View>
        </View>
        <View style={styles.box}>
          <TouchableOpacity style={styles.button} onPress={() => console.log('hello toi')}>
            <Text style={styles.textButton}> Créer mon compte</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.ou}>ou</Text>
        <View style={styles.box}>
          <TouchableOpacity style={styles.button} onPress={() => console.log('hello google')}>
            <Text style={styles.textButton}> Continuer avec google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <TouchableOpacity style={styles.button} onPress={() => console.log('hello facebook')}>
            <Text style={styles.textButton}> Continuer avec Facebook</Text>
          </TouchableOpacity>
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
  background: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginBottom: 40,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 25,
  },

  titre: {
    alignItems: 'center',
    justifyContent: 'center',
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
  titre2: {
    fontFamily: 'antipasto', // Custom font family
    color: 'black', // White color
    fontSize: 30, // 60 font size
  },
  bloc: {
    margin: 15,
  },
  inputContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    width: 300,
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#8CE795',
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 15,

    textAlign: 'left',
  },
  input: {
    height: 40,
    width: 240,
    fontSize: 20,
  },
  box: {
    alignItems: 'center',
    backgroundColor: '#3FA96A',
    borderRadius: 25,
  },
  button: {
    height: 40,
    width: 280,
    borderRadius: 25,
    backgroundColor: '#bee6c2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textButton: {
    color: 'black',
  },
  ou: {
    color: 'black',
  },
});

export default SignupScreen;
