import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UmbrellasScreen = ({ route, navigation }) => {
  const { buildingId } = route.params;
  const [umbrellas, setUmbrellas] = useState([]);
  const [buildingName, setBuildingName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUmbrellas = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.141:3000/buildings/${buildingId}/umbrellas`
      );
      setBuildingName(response.data.buildingName);
      setUmbrellas(response.data.umbrellas);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching umbrellas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUmbrellas();

    const intervalId = setInterval(() => {
      fetchUmbrellas();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [buildingId]);

  const handleRentUmbrella = async (umbrellaId) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'User ID not found in storage');
        return;
      }

      const response = await axios.post(
        'http://192.168.1.141:3000/rent-umbrella',
        {
          userId,
          umbrellaId,
        }
      );

      if (response.status === 200) {
        const rentalId = response.data.rentalId; // Get rentalId from the response
        await AsyncStorage.setItem('rentalId', rentalId); // Store rentalId in AsyncStorage

        Alert.alert('Rental Success', 'Umbrella rented successfully', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('ActiveRental', { rentalId, umbrellaId }),
          },
        ]);
      }
    } catch (error) {
      console.log('Error renting umbrella:', error);
      Alert.alert('Error', 'Failed to rent umbrella. Please try again.');
    }
  };

  const confirmRentUmbrella = (umbrellaId) => {
    Alert.alert(
      'Confirm Rental',
      `Do you want to rent this umbrella (ID: ${umbrellaId})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Rent', onPress: () => handleRentUmbrella(umbrellaId) },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available umbrellas in {buildingName}</Text>
      {umbrellas.map((umbrella) => (
        <TouchableOpacity
          key={umbrella.umbrella_id}
          style={styles.umbrellaButton}
          onPress={() => confirmRentUmbrella(umbrella.umbrella_id)}
        >
          <Text style={styles.buttonText}>{umbrella.umbrella_id}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  umbrellaButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default UmbrellasScreen;
