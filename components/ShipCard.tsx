import React from "react";
import { Image, Text, View } from "react-native";
import { icons } from "../constants";

export const ShipCard = ({
  name,
  company,
  destination_state,
  destination_zone,
  status,
  type,
  date,
  time,
}) => {
  return (
    <View className="px-4">
      <View className="flex p-4 flex-row items-center space-x-4 w-full h-20 mb-3  bg-secondary-300 rounded-2xl  focus:border-secondary">
        <Image source={icons.box} className="w-9 h-9" resizeMode="contain" />

        <View className="flex flex-col items-start justify-between">
          <Text className="text-xs font-pregular uppercase">{company}</Text>
          <Text className="text-base font-pbold">{name}</Text>
          <View className="flex flex-row items-center space-x-2">
            <Text className="text-xs font-pregular capitalize">
              {destination_state}
            </Text>
            <Image
              source={icons.right}
              className="w-3 h-3 "
              resizeMode="contain"
            />
            <Text className="text-xs font-pregular capitalize">
              {destination_zone}
            </Text>
          </View>
        </View>
        <Text className="text-xs font-pregular uppercase bg-blue-200 border border-white rounded-lg p-2 text-secondary">
          {status}
        </Text>
        <Image source={icons.scale} className="w-7 h-7 " resizeMode="contain" />
      </View>
    </View>
  );
};
