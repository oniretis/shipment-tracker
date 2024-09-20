import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Scan = () => {
  return (
    <SafeAreaView className="px-4 my-6 bg-secondary-100 h-full">
      <Text className="text-2xl text-white font-psemibold">scanned</Text>
    </SafeAreaView>
  );
};

export default Scan;
