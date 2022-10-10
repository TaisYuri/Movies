import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";

type IButton = TouchableOpacityProps 

export function ButtonSecondary({children, ...props}: IButton) {
  return (
    <TouchableOpacity style={style.button} {...props}>
      <Text style={style.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#FF4451'
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FF4451",
  },
});
