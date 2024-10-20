import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import UmbrellasScreen from '../screens/UmbrellasScreen';
import HistoryScreen from '../screens/HistoryScreen';

const TopTab = createMaterialTopTabNavigator();

function TopTabNavigator() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0D171C',
        tabBarInactiveTintColor: '#4F7D96',
        tabBarIndicatorStyle: { backgroundColor: '#0D171C' },
        tabBarStyle: { backgroundColor: '#F5F5F5' },
      }}
    >
      <TopTab.Screen name="Home" component={HomeScreen} />
      <TopTab.Screen name="Umbrellas" component={UmbrellasScreen} />
      <TopTab.Screen name="History" component={HistoryScreen} />
    </TopTab.Navigator>
  );
}

export default TopTabNavigator;
