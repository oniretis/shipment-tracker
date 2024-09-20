import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Image } from "react-native";
import { images } from "../constants";
import { useRouter } from "expo-router";

const AnimatedLogoScreen = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const colorValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  useEffect(() => {
    const animationSequence = Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 16,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(colorValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start(() => {
      router.replace("/(auth)/onBoarding");
    });

    return () => animationSequence.stop();
  }, [scaleValue, colorValue, opacityValue, router]);

  const backgroundColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#2F50C1"],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.Image
        source={images.logoSmall}
        style={[
          styles.logo,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default AnimatedLogoScreen;
