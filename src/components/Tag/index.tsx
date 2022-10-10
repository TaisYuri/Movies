import React from "react";
import { View, Text, StyleSheet } from "react-native";

type ITag ={
  label: string;
} 

export function Tag({label}: ITag) {
  return (
    <View style={style.button} >
      <Text style={style.text}>{label}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#FF4451'
  },
  text: {
    fontSize: 12,
    color: "#FF4451",
  },
});
