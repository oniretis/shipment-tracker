import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-secondary-300 rounded-2xl  focus:border-secondary">
      <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      <TextInput
        className="text-base mt-0.5 text-secondary flex-1 font-pregular"
        value={query}
        placeholder="Search "
        placeholderTextColor="#A7A3B3"
        onChangeText={(e) => setQuery(e)}
      />
    </View>
  );
};

export default SearchInput;
