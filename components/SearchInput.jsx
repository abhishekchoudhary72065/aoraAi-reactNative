import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";

const SearchInput = ({
  value,
  handleChange,
  otherStyles,
  placeholder,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View
      className={`w-full relative items-center h-16 flex-row border-2 ${
        focus ? "border-secondary" : "border-black-200"
      }   rounded-2xl px-4 gap-x-4`}
    >
      <TextInput
        className="flex-1 text-white text-base mt-0.5 font-pregular"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeText={handleChange}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
