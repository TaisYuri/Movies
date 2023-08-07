import React from 'react';
import {
  BoxRelease,
  Container,
  Note,
  Poster,
  WithoutPoster,
  ContainerPoster,
} from './styles';
import { type ICardPerson } from './types';
import { Shimmer } from '../Shimmer';
import { TextWithoutImg } from '../Card/styles';

export function CardPerson({
  character,
  name,
  profilePath,
  onPress,
  size = 'xl',
}: ICardPerson): JSX.Element {
  return (
    <Container onPress={onPress} activeOpacity={0.8}>
      {profilePath != null ? (
        <ContainerPoster size={size}>
          <Shimmer size={size} typeCard="person" />
          <Poster
            size={size}
            source={{ uri: `https://image.tmdb.org/t/p/w500/${profilePath}` }}
            resizeMode="contain"
          />
        </ContainerPoster>
      ) : (
        <WithoutPoster size={size}>
          <TextWithoutImg>{name?.slice(0, 1)}</TextWithoutImg>
        </WithoutPoster>
      )}
      <BoxRelease>
        <Note>{name}</Note>
        <Note style={{ fontWeight: 'bold' }}>{character}</Note>
      </BoxRelease>
    </Container>
  );
}
