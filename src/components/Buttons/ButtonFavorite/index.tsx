import React from 'react';
import { type TouchableWithoutFeedbackProps } from 'react-native';
import { Button, ButtonText } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

type IButton = TouchableWithoutFeedbackProps & {
  hasFavorite?: boolean;
};

export function ButtonFavorite({
  children,
  hasFavorite = false,
  ...props
}: IButton): JSX.Element {
  const theme = useTheme();
  return (
    <Button {...props}>
      <MaterialIcons
        name={hasFavorite ? 'favorite' : 'favorite-border'}
        size={24}
        color={theme.colors.primary}
      />
      <ButtonText>{children}</ButtonText>
    </Button>
  );
}
