import React from 'react';
import { BoxRelease, Container, Note, Poster } from './styles';
import { type ICardPerson } from './types';

export function CardPerson({
  character,
  name,
  profilePath,
  onPress,
  size = 'xl',
}: ICardPerson): JSX.Element {
  return (
    <Container onPress={onPress}>
      <Poster
        size={size}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${profilePath}` }}
        resizeMode="contain"
      />
      <BoxRelease>
        <Note>{name}</Note>
        <Note style={{ fontWeight: 'bold' }}>{character}</Note>
      </BoxRelease>
    </Container>
  );
}
