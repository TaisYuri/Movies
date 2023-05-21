import React from 'react';
import { Container, TagText, ContentImage } from './styles';
import VoteStars from '../../assets/vote_stars.svg';

interface ITag {
  label?: string;
}

export function VoteAverage({ label }: ITag): JSX.Element {
  return (
    <Container>
      <VoteStars width={140} height={60} style={{ margin: 0 }} />
      <ContentImage>
        <TagText>{label}</TagText>
      </ContentImage>
    </Container>
  );
}
