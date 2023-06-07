import React from 'react';
import { type TouchableWithoutFeedbackProps } from 'react-native';
import { Button } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

type IButton = TouchableWithoutFeedbackProps & {
  hasFavorite?: boolean;
};

export function ButtonFavorite({
  hasFavorite = false,
  ...props
}: IButton): JSX.Element {
  const theme = useTheme();
  return (
    <Button {...props}>
      <MaterialCommunityIcons
        name={hasFavorite ? 'heart' : 'heart-plus-outline'}
        size={24}
        color={theme.colors.primary}
      />
    </Button>
  );
}
