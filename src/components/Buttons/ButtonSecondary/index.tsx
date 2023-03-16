import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";
import { Button, ButtonText } from "./styles";

type IButton = TouchableOpacityProps 

export function ButtonSecondary({children, ...props}: IButton) {
  return (
    <Button {...props}>
      <ButtonText >{children}</ButtonText>
    </Button>
  );
}

