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
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface SigninScreenProps {}

const SigninScreen: React.FunctionComponent<SigninScreenProps> = (props) => {
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
        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Text style={styles.titre2}>Se connecter :</Text>
        </View>
        <View style={styles.bloc}>
          <View style={styles.inputContainer}>
            <View
              style={{
                position: 'absolute',
                top: -10,
                left: 10,
                backgroundColor: '#99e6a0',
                paddingHorizontal: 5,
              }}
            >
              <Text style={{ fontFamily: 'antipasto', fontSize: 18, textAlign: 'left' }}>
                Email
              </Text>
            </View>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                position: 'absolute',
                top: -10,
                left: 10,
                backgroundColor: '#8CE795',
                paddingHorizontal: 5,
              }}
            >
              <Text style={{ fontFamily: 'antipasto', fontSize: 18, textAlign: 'left' }}>
                Mot de passe
              </Text>
            </View>
            <TextInput style={styles.input} value={motDePasse} onChangeText={setMotDePasse} />
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.box}>
            <TouchableOpacity style={styles.button} onPress={() => console.log('hello toi')}>
              <Text style={styles.textButton}> Connexion</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.ou}>ou</Text>
          <View style={styles.boxNetworks}>
            <View style={styles.box}>
              <TouchableOpacity style={styles.button} onPress={() => console.log('hello google')}>
                <Text style={styles.textButton}>
                  {' '}
                  Continuer avec google <FontAwesomeIcon name='google-plus' size='15%' />
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity style={styles.button} onPress={() => console.log('hello facebook')}>
                <Text style={styles.textButton}>
                  {' '}
                  Continuer avec Facebook <FontAwesomeIcon name='facebook' size='15%' />
                </Text>
              </TouchableOpacity>
            </View>
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
    // alignItems: 'center',
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
    paddingTop: 12,
  },

  titre: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontFamily: 'Gentle',
    color: '#3FA96A',
    fontSize: 20,
  },
  text2: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'antipasto',
  },
  titre2: {
    fontFamily: 'antipasto', // Custom font family
    color: 'black', // White color
    fontSize: 23, // 60 font size
    marginLeft: 20,
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

  input: {
    height: 40,
    width: 240,
    fontSize: 20,
  },
  boxNetworks: {
    marginBottom: 100,
  },
  box: {
    alignItems: 'center',
    backgroundColor: '#3FA96A',
    borderRadius: 25,
    marginBottom: 30,
  },
  button: {
    height: 45,
    width: 280,
    borderRadius: 25,
    backgroundColor: '#ccedcf',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3FA96A',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 15.22,
    shadowRadius: 12.1,
  },

  textButton: {
    color: 'black',
    fontFamily: 'antipasto',
    fontSize: 18,
  },
  ou: {
    color: 'black',
    marginBottom: 20,
  },
});

export default SigninScreen;
