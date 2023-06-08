import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Container, ContentTitle } from './styles';
import { IHeader } from './types';
import { Title } from '../Title';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

export function Header({ title }: IHeader): JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Container
      colors={[
        theme.colors.grays.grayscale_200,
        theme.colors.grays.grayscale_100,
        'transparent',
      ]}
    >
      <Icon
        name="arrowleft"
        size={24}
        color={theme.colors.base}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ContentTitle>
        <Title>{title}</Title>
      </ContentTitle>
    </Container>
  );
}
