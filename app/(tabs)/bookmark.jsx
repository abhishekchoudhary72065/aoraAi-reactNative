import React, { useState } from "react";
import { Text, View, FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAppwrite from "../../lib/useAppwrite";
import { getBookmarkPost } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import images from "../../constants/images";
import SearchInput from "../../components/SearchInput";

const bookmark = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useGlobalContext();
  const { data: bookmark, refetch } = useAppwrite(() =>
    getBookmarkPost(user?.$id),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    // recall if any new video appeared
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={bookmark}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard item={item} />}
        header
        ListHeaderComponent={() => (
          <View style={{ marginVertical: 24, gap: 24 }} className="pt-5 px-5">
            <View className="justify-between items-start mb-6 flex-row">
              <View className="gap-y-1">
                <Text className="font-pmedium text-sm text-gray-100">
                  Saved Videos
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {user?.username}
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
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="You havent saved any videos"
            subtitle="Go to home page & like any video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default bookmark;
