import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";

type IButton = TouchableOpacityProps 

export function ButtonPrimary({children, ...props}: IButton) {
  return (
    <TouchableOpacity style={style.button} {...props}>
      <Text style={style.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(226, 18, 33)',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
});
