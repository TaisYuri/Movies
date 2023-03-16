import { StyleProp, ViewStyle } from "react-native";

export interface IHeader {
    title: string;
    goBack?: () => void;
    search?: () => void;
    style?: StyleProp<ViewStyle>;
  }