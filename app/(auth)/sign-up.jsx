import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle the signin
  const handleSubmit = async () => {
    if (!form.username || !form.email || form.password.length < 8) {
      Alert.alert("Field are empty or password must be shorter than 8");
      return;
    }
    setIsSubmitting(true);
    try {
      const user = await createUser(form.username, form.email, form.password);
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        router.replace("/home");
      }
    } catch (err) {
      Alert.alert(err.message);
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
            Sign Up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            placeholder="Enter your username"
            handleChange={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
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
            title="Sign Up"
            onPress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="pt-5 flex-row justify-center gap-2">
            <Text className="text-lg text-gray-200 font-pregular">
              Already have an account?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg text-secondary font-psemibold"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
