import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyEmailScreen = ({ route }) => {
  const email = route?.params?.email;
  const [confirmationCode, setConfirmationCode] = useState('');
  const navigation = useNavigation();

  const verifyEmail = async () => {
    if (!email) {
      Alert.alert('Error', 'Email not found.');
      return;
    }

    try {
      console.log(`Email: ${email}, Confirmation Code: ${confirmationCode}`);

      const response = await axios.post(
        'http://192.168.1.141:3000/verify-email',
        {
          email,
          confirmationCode,
        }
      );

      const userId = response.data.userId;

      await AsyncStorage.setItem('userId', userId);

      Alert.alert('Success', response.data.msg);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.response?.data?.msg || 'Verification failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmation Code"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
      />
      <TouchableOpacity style={styles.button} onPress={verifyEmail}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerifyEmailScreen;
