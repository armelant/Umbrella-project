import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity } from 'react-native';
// import HomeScreen from '../screens/HomeScreen';
import HomeStackNavigator from './HomeStackNavigator';
import UmbrellasScreen from '../screens/UmbrellasScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconPath;
          let iconSize = 27;

          if (route.name === 'Home') {
            iconPath = focused
              ? require('../assets/home-active.png')
              : require('../assets/home-inactive.png');
          } else if (route.name === 'Umbrellas') {
            iconPath = focused
              ? require('../assets/umbrella-active.png')
              : require('../assets/umbrella-inactive.png');
          } else if (route.name === 'History') {
            iconPath = focused
              ? require('../assets/history-active.png')
              : require('../assets/history-inactive.png');
          }

          return (
            <Image
              source={iconPath}
              style={{ width: iconSize, height: iconSize, tintColor: color }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: '#0D171C',
        tabBarInactiveTintColor: '#4F7D96',
        tabBarStyle: {
          height: 55,
        },
        headerTitleStyle: {
          fontSize: 22,
          color: '#0D171C',
        },
        headerStyle: {
          backgroundColor: '#F5F5F5',
        },
        ...(route.name === 'Home' && {
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={require('../assets/user.png')}
                style={{ width: 22, height: 22, marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        }),
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Umbrellas" component={UmbrellasScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
