import { View,  TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const [focus, setFocus] = useState(false);
  const path = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View
      className={`w-full relative items-center h-16 flex-row border-2 ${
        focus ? "border-secondary" : "border-black-200"
      }   rounded-2xl px-4 gap-x-4`}
    >
      <TextInput
        className="flex-1 text-white text-base mt-0.5 font-pregular"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert("Please input something to search");
            return;
          }
          if (path.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
