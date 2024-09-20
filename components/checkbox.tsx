import { StyleSheet } from "react-native";
import Color from "color";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import {
  ACTIVE_COLOR,
  INACTIVE_COLOR,
  BACKGROUND_COLOR,
} from "../constants/constants";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const TimingConfig = {
  duration: 150,
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onPress,
}) => {
  const fadedActiveColor = Color(ACTIVE_COLOR).alpha(0.1).toString();

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        checked ? fadedActiveColor : BACKGROUND_COLOR,
        TimingConfig
      ),
      borderColor: withTiming(
        checked ? ACTIVE_COLOR : BACKGROUND_COLOR,
        TimingConfig
      ),
      paddingLeft: 10,
      paddingRight: !checked ? 10 : 12,
    };
  }, [checked]);

  const rTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? ACTIVE_COLOR : INACTIVE_COLOR, TimingConfig),
    };
  }, [checked]);

  return (
    <Animated.View
      layout={LinearTransition.springify().mass(0.8)}
      style={[styles.container, rContainerStyle]}
      onTouchEnd={onPress}
    >
      <Animated.Text
        className="text-base font-pregular text-neutral-800"
        style={[rTextStyle]}
      >
        {label}
      </Animated.Text>
      {checked && (
        <Animated.View
          entering={FadeIn.duration(350)}
          exiting={FadeOut}
          style={{
            marginLeft: 8,
            justifyContent: "center",
            alignItems: "center",
            height: 20,
            width: 20,
          }}
        >
          {/* <AntDesign name="checkcircle" size={20} color={ACTIVE_COLOR} /> */}
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
