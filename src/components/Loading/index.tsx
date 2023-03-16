import React, { useRef } from "react";
import {  TouchableOpacityProps } from "react-native";
import { Container } from "./styles";
import LottieView from "lottie-react-native";


export function Loading() {
  const animation = useRef(null);

  return (
    <Container>
    <LottieView
      autoPlay
      ref={animation}
      style={{
        width: 200,
        height: 200,
        // backgroundColor: "#eee",
      }}
      source={require("../../assets/movie_lottie.json")}
    />
  </Container>
  );
}
