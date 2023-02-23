import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Animated,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Spinner } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'native-base';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface ProfileScreenProps {}

const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = (props) => {
  const [progress, setProgress] = useState(0);

  const personalPlants = [];
  for (let i = 0; i < 5; i++) {
    let style = { color: 'black' };
    if (i < 3) {
      style = { color: 'yellow' };
    }
    personalPlants.push(<FontAwesomeIcon name='star' style={style} />);
  }

  const handleButtonClick = () => {
    if (progress < 90) {
      setProgress(progress + 10);
    } else {
      setProgress(100);
    }
  };

  return (
    <LinearGradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <Image source={require('../../assets/avatar1.png')} style={styles.avatar} />
          <View style={styles.bar}>
            <ProgressBar progress={progress} height={15} color='#3FA96A' />
            <Button title='Progress' onPress={handleButtonClick} />
          </View>
        </View>
        <TouchableOpacity style={styles.card} onPress={console.log('profil')}>
          <View style={styles.cardProfil}>
            <View style={styles.profil}>
              <View style={styles.infoprofil}>
                <Avatar
                  bg='amber.500'
                  source={{
                    uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                  }}
                  size='lg'
                >
                  NB
                  <Avatar.Badge bg='green.500' size='23%' />
                </Avatar>
                <View style={styles.infoprofilavatar}>
                  <Text style={{ fontFamily: 'antipasto', fontSize: 18 }}>Mathis</Text>
                  <Text style={{ marginTop: 6, marginBottom: 6 }}>{personalPlants}</Text>

                  <Text style={{ fontFamily: 'antipasto', fontSize: 18 }}>Voir mon profil</Text>
                </View>
              </View>
            </View>
            <FontAwesomeIcon style={{ marginRight: 22 }} name='angle-right' size='30%' />
          </View>
        </TouchableOpacity>
        <View style={styles.bottom}>
          <View style={styles.line} />
          <TouchableOpacity style={styles.card} onPress={console.log('favoris')}>
            <View style={styles.cardTitle}>
              <FontAwesomeIcon style={styles.icon} name='heart' size='20%' />
              <Text style={styles.cardTitleText}> Favoris </Text>
            </View>
            <View>
              <FontAwesomeIcon name='angle-right' size='30%' />
            </View>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity style={styles.card} onPress={console.log('ventes')}>
            <View style={styles.cardTitle}>
              <FontAwesomeIcon style={styles.icon} name='bookmark' size='20%' />
              <Text style={styles.cardTitleText}> Mes ventes et achats </Text>
            </View>
            <View>
              <FontAwesomeIcon name='angle-right' size='30%' />
            </View>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity style={styles.card} onPress={console.log('parametres')}>
            <View style={styles.cardTitle}>
              <FontAwesomeIcon style={styles.icon} name='gears' size='20%' />
              <Text style={styles.cardTitleText}> Paramètres </Text>
            </View>
            <View>
              <FontAwesomeIcon name='angle-right' size='30%' />
            </View>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity style={styles.card} onPress={console.log('avis')}>
            <View style={styles.cardTitle}>
              <FontAwesomeIcon style={styles.icon} name='commenting' size='20%' />
              <Text style={styles.cardTitleText}> Mes avis </Text>
            </View>
            <View>
              <FontAwesomeIcon name='angle-right' size='30%' />
            </View>
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
    flex: 1,
  },

  top: {
    alignItems: 'center',
    padding: 22,
    justifyContent: 'space-between',
    flex: 1,
  },

  bottom: {
    alignItems: 'center',
    padding: 22,
    justifyContent: 'space-between',
    flex: 1,
  },

  background: {
    width: '100%',
    height: '100%',
  },

  avatar: {
    marginTop: 40,
    marginBottom: 20,
    width: '40%',
    height: '60%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4.1,
  },
  bar: {
    width: '100%',
    borderRadius: 10,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.2,
  },
  profil: {
    justifyContent: 'flex-start',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '10%',
  },
  infoprofil: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 22,
  },
  infoprofilavatar: {
    marginLeft: 15,
  },

  cardTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  cardTitleText: {
    marginLeft: 15,
    fontFamily: 'antipasto',
    fontSize: 18,
  },
  icon: {
    opacity: 0.2,
  },
  cardProfil: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
});
export default ProfileScreen;
