import React from 'react';
import { Container, ContentImage } from './styles';
import VoteStars from '../../assets/vote_stars.svg';
import { Title } from '../Title';

interface ITag {
  label?: string;
}

export function VoteAverage({ label }: ITag): JSX.Element {
  return (
    <Container>
      <VoteStars width={140} height={60} style={{ margin: 0 }} />
      <ContentImage>
        <Title>{label}</Title>
      </ContentImage>
    </Container>
  );
}
