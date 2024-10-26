import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  isLoading,
  textStyles,
}) => {
  return (
    <TouchableOpacity
      className={`bg-secondary w-full mt-10 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
      disabled={isLoading}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text className={`text-white text-2xl font-bold ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
