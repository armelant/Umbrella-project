import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
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

  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.headerText}>Select a Building</Text>
  //       <FlatList
  //         data={buildings}
  //         keyExtractor={(item) => item.building_id}
  //         renderItem={({ item }) => (
  //           <TouchableOpacity
  //             style={styles.buildingButton}
  //             onPress={() =>
  //               navigation.navigate('UmbrellasScreen', {
  //                 buildingId: item.building_id,
  //               })
  //             }
  //           >
  //             <Text style={styles.buttonText}>
  //               {item.name || `Building ${item.building_id}`}
  //             </Text>
  //           </TouchableOpacity>
  //         )}
  //       />
  //       <Button
  //         title="Profile"
  //         onPress={() => navigation.navigate('Profile')}
  //         color="#007bff"
  //       />
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Select a Building</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/user.png')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  profileIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
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
