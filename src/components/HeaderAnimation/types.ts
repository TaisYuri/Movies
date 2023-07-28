import { Animated } from 'react-native';
import { typeDetailProps } from 'src/hooks/useHandleTypeDetails/types';

export interface IHeaderAnimation {
  image?: string;
  scrollY: Animated.Value;
  id: string;
  type: typeDetailProps;
}
