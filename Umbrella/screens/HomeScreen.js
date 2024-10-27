import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchBuildings = async () => {
    try {
      const response = await fetch('http://192.168.1.141:3000/buildings');
      const data = await response.json();
      setBuildings(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching buildings:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuildings();

    const intervalId = setInterval(fetchBuildings, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select a Building</Text>
      <FlatList
        data={buildings}
        keyExtractor={(item) => item.building_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.buildingButton}
            onPress={() =>
              navigation.navigate('UmbrellasScreen', {
                buildingId: item.building_id,
              })
            }
          >
            <Text style={styles.buttonText}>
              {item.name || `Building ${item.building_id}`}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buildingButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
