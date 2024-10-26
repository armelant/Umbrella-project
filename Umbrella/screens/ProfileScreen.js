import React from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gStyles } from '../styles/style';
import { registerUser, loginUser } from '../api';

function ProfileScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [isLoginMode, setIsLoginMode] = React.useState(true);

  const handleSubmit = async () => {
    try {
      if (isLoginMode) {
        const data = await loginUser({ email, password });
        console.log('Login Success:', data);
        await AsyncStorage.setItem('token', data.token);
        navigation.navigate('Home');
      } else {
        const data = await registerUser({ email, password, fullName });
        console.log('Registration Success:', data);
        await AsyncStorage.setItem('token', data.token);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'An error occurred.'
      );
    }
  };

  return (
    <View style={gStyles.main}>
      <Text style={gStyles.title}>{isLoginMode ? 'Login' : 'Register'}</Text>

      {!isLoginMode && (
        <TextInput
          style={gStyles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      )}

      <TextInput
        style={gStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        required
      />
      <TextInput
        style={gStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        required
      />

      <Button
        title={isLoginMode ? 'Login' : 'Register'}
        onPress={handleSubmit}
      />
      <Button
        title={`Switch to ${isLoginMode ? 'Register' : 'Login'}`}
        onPress={() => setIsLoginMode(!isLoginMode)}
      />
    </View>
  );
}

export default ProfileScreen;
