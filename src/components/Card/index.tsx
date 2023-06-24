import React from 'react';
import {
  BoxNote,
  Poster,
  Note,
  Container,
  BoxRelease,
  PosterWithoutImg,
  TextWithoutImg,
  BoxFavorite,
} from './styles';
import { type ICard } from './types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

export function Card({
  uri,
  title,
  vote,
  release,
  onPress,
  onPressFavorite,
  hasFavorite = false,
}: ICard): JSX.Element {
  const theme = useTheme();

  return (
    <Container onPress={onPress}>
      {uri !== undefined && uri !== null ? (
        <Poster
          source={{ uri: `https://image.tmdb.org/t/p/w500/${uri}` }}
          resizeMode="contain"
        />
      ) : (
        <PosterWithoutImg>
          <TextWithoutImg>{title}</TextWithoutImg>
        </PosterWithoutImg>
      )}

      {Boolean(vote) && Boolean(Number(vote) > 0) && (
        <BoxNote>
          <Note>
            {vote != null && vote?.length > 2
              ? Number(vote).toFixed(1)
              : `${vote}.0`}
          </Note>
        </BoxNote>
      )}
      {Boolean(hasFavorite) && (
        <BoxFavorite onLongPress={onPressFavorite}>
          <MaterialCommunityIcons
            name={onPressFavorite != null ? 'heart-minus' : 'heart'}
            size={24}
            color={theme.colors.primary}
          />
        </BoxFavorite>
      )}

      {Boolean(release) && (
        <BoxRelease>
          <Note style={{ fontWeight: 'bold' }}>{release}</Note>
        </BoxRelease>
      )}
    </Container>
  );
}
