import React from 'react';
import { ContentTitle } from './styles';
import { TextProps } from 'react-native';

export function Title({ ...props }: TextProps): JSX.Element {
  return <ContentTitle {...props} />;
}
