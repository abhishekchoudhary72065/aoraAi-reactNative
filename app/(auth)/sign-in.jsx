import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { getCurrentUser, Signin } from "../../lib/appwrite";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (!form.email || form.password.length < 8) {
      Alert.alert("Field are empty or one of them must be shorter than 8");
      return;
    }
    setIsSubmitting(true);
    try {
      const user = await Signin(form.email, form.password);
      const result = await getCurrentUser();
      if (user && result) {
        setUser(result);
        setIsLoggedIn(true);
        router.replace("/home");
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center h-full p-6">
          <Image
            source={images.logo}
            className="w-[125px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-3xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChange={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChange={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            onPress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="pt-5 flex-row justify-center gap-2">
            <Text className="text-lg text-gray-200 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg text-secondary font-psemibold"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
