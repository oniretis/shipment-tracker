import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

const Wallet = () => {
  return (
    <SafeAreaView className="bg-secondary-100 h-full">
      <View className="flex flex-row items-center justify-between">
        <Text>wallet</Text>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
