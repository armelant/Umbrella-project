import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Video } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const video = React.useRef(null);
  return (
    <View style={styles.container}>
      {/* Video player */}
      <Video
        ref={video}
        style={styles.video}
        source={require('../assets/HAMK-animaatio-short-cut_2.mp4')}
        resizeMode="cover"
        shouldPlay
        isLooping
      />
      {/* Text */}
      <View style={styles.overlay}>
        <Text style={styles.text}>Welcome to Umbrella!</Text>
      </View>
      {/* Buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0, 0, 0, 0.0)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '25%',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: 100,
    // Shadow for Android
    elevation: 3,
    // Shadow for iOS
    shadowColor: '#000', // Shadow color (usually black)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset; {width: 0, height: 2} positions the shadow below the element
    shadowOpacity: 0.3, // Shadow opacity (0 to 1); 0.3 makes it 30% opaque
    shadowRadius: 3.84, // Shadow blur radius, controls the shadow's spread and size
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});
