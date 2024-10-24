import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UmbrellasScreen = ({ route }) => {
  const { buildingId } = route.params;
  const [umbrellas, setUmbrellas] = useState([]);

  useEffect(() => {
    const fetchUmbrellas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/buildings/${buildingId}/umbrellas`
        );
        setUmbrellas(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to load umbrellas');
      }
    };
    fetchUmbrellas();
  }, [buildingId]);

  const rentUmbrella = async (umbrellaId) => {
    const userId = await AsyncStorage.getItem('userId');
    try {
      await axios.post('http://localhost:3000/rent-umbrella', {
        userId,
        umbrellaId,
      });
      Alert.alert('Success', 'Umbrella rented successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to rent umbrella');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {umbrellas.map((umbrella) => (
        <View key={umbrella.umbrella_id} style={{ marginBottom: 10 }}>
          <Text>Umbrella ID: {umbrella.umbrella_id}</Text>
          <Button title="Rent Umbrella" onPress={() => rentUmbrella(umbrella.umbrella_id)} />
        </View>
      ))}
    </View>
  );
};

export default UmbrellasScreen;
