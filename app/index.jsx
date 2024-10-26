import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <SafeAreaView style={{ paddingHorizontal: 30 }}>
        <Text
          style={{
            marginVertical: 30,
            fontSize: 50,
            fontWeight: "700",
            color: "white",
          }}
        >
          App
        </Text>
        <Link
          href={"/home"}
          style={{
            fontSize: 20,
            color: "blue",
            fontStyle: "italic",
          }}
        >
          Go to Profile
        </Link>
      </SafeAreaView>
    </View>
  );
};

export default App;
