import React from "react";
import { View, Text, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Umbrella App!</Text>
      <Button
        title="Go to Umbrellas"
        onPress={() => navigation.navigate("Umbrellas")}
      />
      <Button
        title="Go to History"
        onPress={() => navigation.navigate("History")}
      />
    </View>
  );
}

export default HomeScreen;
