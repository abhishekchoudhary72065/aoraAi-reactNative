import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import icons from "@/constants/icons";

const FormField = ({
  title,
  value,
  handleChange,
  otherStyles,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(false);
  return (
    <View className={`gap-3 ${otherStyles}`}>
      <Text className="text-base text-gray-200 font-pmedium">{title}</Text>
      <View
        className={`w-full relative items-center h-16 flex-row border-2 ${
          focus ? "border-secondary" : "border-black-200"
        }   rounded-2xl px-4`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChangeText={handleChange}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              resizeMode="contain"
              className="w-8 h-8"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
