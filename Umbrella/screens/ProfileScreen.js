import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { gStyles } from '../styles/style';
import { registerUser, loginUser } from '../utils/api';

function ProfileScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [isLoginMode, setIsLoginMode] = React.useState(true);

  const handleSubmit = async () => {
    if (isLoginMode) {
      // Login
      try {
        const data = await loginUser({ email, password });
        console.log('Login Success:', data);
        // Here we can save the token and navigate to another screen
      } catch (error) {
        console.error('Login Error:', error);
      }
    } else {
      // Registration
      try {
        const data = await registerUser({ email, password, fullName });
        console.log('Registration Success:', data);
        // Here we can save the token and navigate to another screen
      } catch (error) {
        console.error('Registration Error:', error);
      }
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
      />
      <TextInput
        style={gStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
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
