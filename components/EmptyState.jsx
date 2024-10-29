import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center px-5 gap-2 items-center">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-psemibold text-2xl text-white">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <CustomButton
        title="Create Video"
        onPress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;
