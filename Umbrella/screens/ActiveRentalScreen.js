import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActiveRentalScreen = ({ route, navigation }) => {
  const { rentalId, umbrellaId } = route.params;
  const [loading, setLoading] = useState(false);

  const endRental = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.56.1:3000/end-rental', {
        rentalId,
      });

      if (response.status === 200) {
        await AsyncStorage.removeItem('rentalId'); // Remove rentalId from AsyncStorage
        Alert.alert('Success', response.data.msg, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.msg || 'Failed to end rental');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Rental</Text>
      <Text style={styles.text}>Umbrella ID: {umbrellaId}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="End Rental" onPress={endRental} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ActiveRentalScreen;
