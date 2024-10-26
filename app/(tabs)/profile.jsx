import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <View className="flex-1 bg-pink-500">
      <SafeAreaView className="flex-1 p-10">
        <Text className="text-red-200 text-4xl font-pblack">Profile</Text>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
