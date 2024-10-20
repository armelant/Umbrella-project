import React from 'react';
import { View, Text, Button } from 'react-native';
import { gStyles } from '../styles/style';

function HomeScreen({ navigation }) {
  return (
    <View style={gStyles.main}>
      <Text>Choose a building</Text>
    </View>
  );
}

export default HomeScreen;
