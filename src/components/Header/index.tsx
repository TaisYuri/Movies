import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Container, ContentTitle } from './styles';
import { IHeader } from './types';
import { Title } from '../Title';

export function Header({ title, goBack }: IHeader): JSX.Element {
  return (
    <Container
      colors={['rgba(0,0,0,0.4)', 'rgba(255,255,255,0.1)', 'transparent']}
    >
      <Icon name="arrowleft" size={24} color="white" onPress={goBack} />
      <ContentTitle>
        <Title>{title}</Title>
      </ContentTitle>
    </Container>
  );
}
