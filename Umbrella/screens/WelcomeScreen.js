import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { gStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleSignup = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={gStyles}>
      <View style={styles.headerContainer}>
        <Text style={styles.appName}>RainMate</Text>
        <Image source={require('../assets/umbrella.png')} style={styles.logo} />
      </View>
      <Image source={require('../assets/image.png')} style={styles.banner} />
      <Text style={styles.tagline}>
        Stay Dry, Stay Prepared – Anytime with RainMate!
      </Text>
      <Text style={styles.description}>
        RainMate is a convenient umbrella rental service designed for university
        students. The app allows users to quickly check umbrella availability on
        campus and rent one with just a tap. Integrated with school accounts for
        secure access, RainMate sends helpful reminders to return umbrellas on
        time. Whether it’s a drizzle or a downpour, RainMate ensures you’re
        ready for any rainy day!
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#D9D9D9' }]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={handleSignup}>
          <Text style={styles.singUpButtonText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  logo: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  banner: {
    width: width,
    height: 250,
    esizeMode: 'cover',
    marginVertical: 10,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 14,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#D9D9D9',
    width: '70%',
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
    borderRadius: 100,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '55%',
    borderRadius: 100,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  singUpButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 25,
  },
});
