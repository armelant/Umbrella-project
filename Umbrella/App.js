import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {readAllRENT} from './rentalhistory/history';


export default function App() {
  return (
    //history.readAllRENTAllRENT
  
    <View style={styles.container}>
      <Text>List of Rental History</Text>
      <FlatList
          data={history.readAllRENT()}
          renderItem={(item)=><View><Text>{item.item.umbrella_id} {item.item.rented_at} {item.item.rented_until} {item.item.user_id}</Text></View>}
          />
      <StatusBar style="auto" />
    </View> //calls history and notifications
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'top',
    justifyContent: 'center',
  },
});
