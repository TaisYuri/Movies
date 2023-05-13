import React from 'react';
import { type TouchableWithoutFeedbackProps } from 'react-native';
import { Button, ButtonText } from './styles';

type IButton = TouchableWithoutFeedbackProps;

export function ButtonPrimary({ children, ...props }: IButton): JSX.Element {
  return (
    <Button {...props}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
}
