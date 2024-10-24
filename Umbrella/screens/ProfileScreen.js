import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { gStyles } from '../styles/style';

function ProfileScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={gStyles.main}>
      <Text style={gStyles.title}>Login or Register</Text>

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
        title="Login"
        onPress={() => {
          /* Login logic */
        }}
      />
      <Button
        title="Register"
        onPress={() => {
          /* Registration logic */
        }}
      />
    </View>
  );
}

export default ProfileScreen;
