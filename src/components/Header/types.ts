import { StyleProp, ViewStyle } from 'react-native';

export interface IHeader {
  title: string;
  goBack?: () => void;
  style?: StyleProp<ViewStyle>;
}
