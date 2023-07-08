import React from 'react';
import { TextProps, Text } from 'react-native';
import { useTheme } from 'styled-components/native';

export function Title({ style, ...props }: TextProps): JSX.Element {
  const theme = useTheme();
  return (
    <Text
      style={[
        {
          fontFamily: 'OpenSans_700Bold',
          fontSize: 22,
          color: theme.colors.base,
        },
        style,
      ]}
      {...props}
    />
  );
}
