import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import ProfileButton from '../components/ProfileButton';

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
    <ScrollView>
      <View style={styles.container}>
        <BackButton />

        <View style={styles.header}>
          <Text style={styles.headerText}>Select a Building</Text>
        </View>
        <ProfileButton />
        <FlatList
          data={buildings}
          keyExtractor={(item) => item.building_id.toString()}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 60,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  buildingButton: {
    height: 50,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
