import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.56.1:5000/history')
      .then(response => {
        setHistory(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);
  
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error fetching data</Text>
      </View>
    );
  }

  // const [umbrellas] = useState([
  //   {
  //     _id: '1',
  //     umbrella_id: 'U1',
  //     location_id: 'B1',
  //     sensor_id: 'B1S1',
  //     user_id: 'null',
  //     status: 'Available',
  //   },
  //   {
  //     _id: '2',
  //     umbrella_id: 'U2',
  //     location_id: 'C2',
  //     sensor_id: 'C2S1',
  //     user_id: 'User002',
  //     status: 'In Use',
  //   },
  //   {
  //     _id: '3',
  //     umbrella_id: 'U3',
  //     location_id: 'E1',
  //     sensor_id: 'E1S2',
  //     user_id: 'null',
  //     status: 'Available',
  //   },
  // ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your history:</Text>
      <FlatList
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}> Umbrella ID: {item.umbrella_id}</Text>
            <Text style={styles.itemText}>Slot number: {item.rented_at}</Text>
            <Text style={styles.itemText}>Status: {item.rented_until}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  itemText: {
    fontSize: 20, 
  },
  error: {
    color: 'red',
    fontSize: 18
  },
});

export default HistoryScreen;
