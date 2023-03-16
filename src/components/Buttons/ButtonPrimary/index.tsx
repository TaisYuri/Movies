import React from "react";
import {  TouchableOpacityProps } from "react-native";
import { Button, ButtonText } from "./styles";

type IButton = TouchableOpacityProps 

export function ButtonPrimary({children, ...props}: IButton) {
  return (
    <Button {...props}>
      <ButtonText >{children}</ButtonText>
    </Button>
  );
}
