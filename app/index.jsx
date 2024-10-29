import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const App = () => {
  const { isLoading, isLoggedIn, user } = useGlobalContext();
  if (!isLoading && isLoggedIn && user !== null)
    return <Redirect href="/home" />;
  return (
    <SafeAreaView
      style={{ paddingHorizontal: 30 }}
      className="flex-1 bg-primary"
    >
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center items-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            resizeMethod="contain"
            className="max-w-[380px] w-full h-[300px]"
          />
          <View className="relative mt-5">
            <Text className="text-3xl font-bold text-center text-white">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute -bottom-3 -right-2 w-[50px] h-[15px]"
              resizeMode="contain"
            />
          </View>
          <Text className="font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration of Aora.
          </Text>
          <CustomButton
            title="Custom Button"
            onPress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default App;
