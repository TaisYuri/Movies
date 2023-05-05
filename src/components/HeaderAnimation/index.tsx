import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Animated, ImageBackground, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { IHeaderAnimation } from "./types";
import { LinearGradient } from "expo-linear-gradient";

export function HeaderAnimation({ image, scrollY }: IHeaderAnimation) {
  const navigation = useNavigation();
  const inputRangeToAnimated = [0, 60, 110, 190, 260, 360];

  const AnimatedGradientHelper =
    Animated.createAnimatedComponent(LinearGradient);

  return (
    <>
      <Animated.View
        style={[
          {
            backgroundColor: scrollY.interpolate({
              inputRange: inputRangeToAnimated,
              outputRange: [
                "transparent",
                "transparent",
                "transparent",
                "#1f222a1c",
                "#1f222a61",
                "#1f222a",
              ],
              extrapolate: "clamp",
            }),
          },
          style.containerHeader,
        ]}
      >
        <Icon
          name="arrowleft"
          size={24}
          color="white"
          onPress={navigation.goBack}
        />
        <Animated.Text
          style={{
            opacity: scrollY.interpolate({
              inputRange: inputRangeToAnimated,
              outputRange: [0, 0.25, 0.25, 0.5, 0.75, 1],
            }),
            color: "#fff",
            fontSize: 20,
          }}
        >
          Detalhes
        </Animated.Text>
      </Animated.View>

      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${image}`,
        }}
      >
        <AnimatedGradientHelper
          colors={[
            "transparent",
            "transparent",
            "#1f222a1c",
            "#1f222ace",
            "#1f222a",
          ]}
          style={{
            width: "100%",
            height: scrollY.interpolate({
              inputRange: inputRangeToAnimated,
              outputRange: [250, 210, 180, 130, 100, 60],
              extrapolate: "clamp",
            }),
          }}
        ></AnimatedGradientHelper>
      </ImageBackground>
    </>
  );
}

const style = StyleSheet.create({
  containerHeader: {
    zIndex: 99,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    height: 60,
  },
});
