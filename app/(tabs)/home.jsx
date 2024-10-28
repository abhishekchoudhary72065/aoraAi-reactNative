import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPost, getLatestPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useAppwrite(getAllPost);
  const { data: latestPost } = useAppwrite(getLatestPost);

  const onRefresh = async () => {
    setRefreshing(true);
    // recall if any new video appeared
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard item={item} />}
        header
        ListHeaderComponent={() => (
          <View style={{ marginVertical: 24, gap: 24 }} className="pt-5 px-5">
            <View className="justify-between items-start mb-6 flex-row">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  Dazzler Abhi
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-7">
              <Text className="text-gray-100 font-pregular text-lg mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPost} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
