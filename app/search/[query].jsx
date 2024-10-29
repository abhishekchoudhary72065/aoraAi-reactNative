import { Text, FlatList, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import useAppwrite from "../../lib/useAppwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard item={item} />}
        header
        ListHeaderComponent={() => (
          <View style={{ marginVertical: 24, gap: 24 }} className="pt-5 px-5">
            <View className="mb-5">
              <Text className="font-pmedium text-sm text-gray-100">
                Search Results for :-
              </Text>
              <Text className="font-psemibold text-2xl mt-3 text-white">
                {query}
              </Text>
            </View>
            <SearchInput initialQuery={query} />
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

export default Search;
