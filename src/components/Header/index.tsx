import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Container, ContentTitle } from './styles';
import { IHeader } from './types';
import { Title } from '../Title';
import { useTheme } from 'styled-components/native';

export function Header({ title, goBack }: IHeader): JSX.Element {
  const theme = useTheme();
  return (
    <Container
      colors={['rgba(0,0,0,0.2)', 'rgba(255,255,255,0.1)', 'transparent']}
    >
      <Icon
        name="arrowleft"
        size={24}
        color={theme.colors.base}
        onPress={goBack}
      />
      <ContentTitle>
        <Title>{title}</Title>
      </ContentTitle>
    </Container>
  );
}
