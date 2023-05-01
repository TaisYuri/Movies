import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Animated, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { IHeaderAnimation } from "./types";

export function HeaderAnimation({ image, scrollY }: IHeaderAnimation) {
  const navigation = useNavigation();
  const inputRangeToAnimated = [0, 60, 140, 190, 260];

  return (
    <>
      <Animated.View
        style={[
          {
            backgroundColor: scrollY.interpolate({
              inputRange: inputRangeToAnimated,
              outputRange: ["transparent", "transparent", "#1f222a1c","#1f222a61", "#1f222a"],
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
              outputRange: [0, 0.25, 0.5, 0.75, 1],
            }),
            color: "#fff",
            fontSize: 20,
          }}
        >
          Detalhes
        </Animated.Text>
        {/* <Icon name="search1" size={24} color="white" /> */}
      </Animated.View>
      <Animated.Image
        style={{
          height: scrollY.interpolate({
            inputRange: inputRangeToAnimated,
            outputRange: [250, 200, 170,120, 60],
            extrapolate: "clamp",
          }),
          width: "100%",
        }}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${image}`,
        }}
      />
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
