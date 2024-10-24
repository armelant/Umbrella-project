import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

const BuildingsScreen = ({ navigation }) => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/buildings');
        setBuildings(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to load buildings');
      }
    };
    fetchBuildings();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {buildings.map((building) => (
        <View key={building.building_id} style={{ marginBottom: 10 }}>
          <Text>{building.name}</Text>
          <Text>Available Umbrellas: {building.umbrella_count}</Text>
          <Button
            title="View Umbrellas"
            onPress={() =>
              navigation.navigate('Umbrellas', { buildingId: building.building_id })
            }
          />
        </View>
      ))}
    </View>
  );
};

export default BuildingsScreen;
