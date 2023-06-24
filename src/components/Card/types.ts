import { TouchableOpacityProps } from 'react-native';

export interface ICard extends TouchableOpacityProps {
  uri: string;
  title: string;
  vote?: string;
  release?: string;
  hasFavorite?: boolean;
  onPressFavorite?: () => void;
}
