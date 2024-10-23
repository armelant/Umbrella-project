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
        console.error('Error fetching history data:', error);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rental History:</Text>
      <FlatList
        data={history}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Umbrella ID: {item.umbrella_id}</Text>
            <Text style={styles.itemText}>Rented at: {new Date(item.rented_at).toLocaleString()}</Text>
            <Text style={styles.itemText}>Rented until: {new Date(item.rented_until).toLocaleString()}</Text>
            <Text style={styles.itemText}>User ID: {item.user_id}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 20,
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});

export default HistoryScreen;
