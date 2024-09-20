import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";
import { icons } from "../constants";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  showIcon?: boolean;
  iconName?: keyof typeof icons;
  iconPosition?: "left" | "right";
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  showIcon = true,
  iconName = "filter",
  iconPosition = "left",
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {showIcon && iconPosition === "left" && (
        <Image
          source={icons[iconName]}
          resizeMode="contain"
          className="w-6 h-6 mr-2"
        />
      )}

      <Text className={`text-white font-pregular text-lg ${textStyles}`}>
        {title}
      </Text>

      {showIcon && iconPosition === "right" && (
        <Image
          source={icons[iconName]}
          resizeMode="contain"
          className="w-6 h-6 ml-2"
        />
      )}

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
