import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import UmbrellasScreen from "../screens/UmbrellasScreen";
import HistoryScreen from "../screens/HistoryScreen";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconPath;
          let iconSize = 25;

          if (route.name === "Home") {
            iconPath = focused
              ? require("../assets/home-active.png")
              : require("../assets/home-inactive.png");
          } else if (route.name === "Umbrellas") {
            iconPath = focused
              ? require("../assets/umbrella-active.png")
              : require("../assets/umbrella-inactive.png");
          } else if (route.name === "History") {
            iconPath = focused
              ? require("../assets/history-active.png")
              : require("../assets/history-inactive.png");
          }

          return (
            <Image
              source={iconPath}
              style={{ width: iconSize, height: iconSize, tintColor: color }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Umbrellas" component={UmbrellasScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
