import React from 'react';
import { type TouchableWithoutFeedbackProps } from 'react-native';
import { Button, ButtonText } from './styles';
import { Ionicons } from '@expo/vector-icons';
import Theme from 'src/theme/Theme';

type IButton = TouchableWithoutFeedbackProps & {
  hasIcon?: boolean;
};

export function ButtonPrimary({
  children,
  hasIcon,
  ...props
}: IButton): JSX.Element {
  const theme = Theme;
  return (
    <Button {...props}>
      {Boolean(hasIcon) && (
        <Ionicons
          name="play-circle-outline"
          size={24}
          color={theme.colors.primary}
        />
      )}

      <ButtonText>{children}</ButtonText>
    </Button>
  );
}
