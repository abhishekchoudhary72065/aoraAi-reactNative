import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";

const VideoCard = ({
  item: {
    title,
    video,
    thumbnail,
    creators: { avatar, username },
  },
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-5 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="contain"
            />
          </View>
          <View className="flex-1 justify-center ml-3 gap-y-1">
            <Text
              numberOfLines={1}
              className="text-white font-psemibold text-sm"
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="w-5 h-5" />
        </View>
      </View>
      {play ? (
        <View className="w-full h-60 mt-3 rounded-xl bg-white/10">
          <Video
            source={{ uri: video }}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
