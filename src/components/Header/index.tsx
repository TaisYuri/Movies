import React from "react";
import { Animated, StyleProp, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Title, Container } from "./styles";

interface IHeader {
  title: string;
  goBack?: () => void;
  search?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Header({ title, goBack, search, style }: IHeader) {
  return (
      <Container
        colors={["rgba(0,0,0,0.4)", "rgba(255,255,255,0.1)", "transparent"]}
        
      >
        <Icon name="arrowleft" size={24} color="white" onPress={goBack} />
        <Title>{title}</Title>
        <Icon name="search1" size={24} color="white" onPress={search} />
      </Container>
  );
}
