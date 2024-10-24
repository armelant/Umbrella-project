import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 

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
      
      const response = await axios.post('http://192.168.56.1:3000/verify-email', {
        email,
        confirmationCode, 
      });

      Alert.alert(
        'Success',
        response.data.msg,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
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
      <Button title="Verify" onPress={verifyEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default VerifyEmailScreen;
