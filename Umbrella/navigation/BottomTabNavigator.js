import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import UmbrellasScreen from "../screens/UmbrellasScreen";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconPath;

          if (route.name === "Home") {
            iconPath = focused
              ? require("../assets/home-active.png")
              : require("../assets/home-inactive.png");
          } else if (route.name === "Umbrellas") {
            iconPath = focused
              ? require("../assets/umbrella-active.png")
              : require("../assets/umbrella-inactive.png");
          }

          return (
            <Image
              source={iconPath}
              style={{ width: size, height: size, tintColor: color }}
            />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Umbrellas" component={UmbrellasScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
