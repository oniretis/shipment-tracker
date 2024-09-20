import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Checkbox } from "./checkbox";
import { useCuisines } from "../hooks/useCuisines";

const Checked = () => {
  const { cuisines, toggleCuisine } = useCuisines();

  return (
    <View className="flex-1 flex-wrap mt-4 px-4">
      <Text className="text-lg font-pregular uppercase text-neutral-800">
        shippment statues
      </Text>
      <View style={styles.listContainer}>
        {cuisines.map((cuisine) => {
          return (
            <Checkbox
              key={cuisine.id}
              label={cuisine.name}
              checked={cuisine.selected}
              onPress={() => {
                toggleCuisine(cuisine.id);
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
});

export { Checked };
