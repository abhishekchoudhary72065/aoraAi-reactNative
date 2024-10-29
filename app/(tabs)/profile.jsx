import { FlatList, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserPosts, signOut } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user?.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard item={item} />}
        header
        ListHeaderComponent={() => (
          <View className="mt-6 px-5 w-full justify-center items-center mb-12">
            <TouchableOpacity
              onPress={logout}
              className="w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-7 h-7"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="cover"
                className="w-[90%] h-[90%] rounded-lg"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyle="mt-5"
              titleStyle="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyle="mr-10"
                titleStyle="text-lg"
              />
              <InfoBox title="1.2k" subtitle="Followers" titleStyle="text-lg" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No Videos found for this search"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
