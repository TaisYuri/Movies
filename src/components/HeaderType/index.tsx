import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Link, Container } from './styles';
import { Title } from '../Title';

interface IHeaderType {
  title: string;
  textLink?: string;
  link?: () => void;
}

export function HeaderType({
  title,
  link,
  textLink,
}: IHeaderType): JSX.Element {
  return (
    <Container>
      <Title>{title}</Title>
      <TouchableOpacity onPress={link}>
        <Link>{textLink}</Link>
      </TouchableOpacity>
    </Container>
  );
}
