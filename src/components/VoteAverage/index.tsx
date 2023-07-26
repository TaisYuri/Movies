import React, { useRef } from 'react';
import { Container } from './styles';
import { Title } from '../Title';
import LottieView from 'lottie-react-native';

interface ITag {
  label?: string;
}

export function VoteAverage({ label }: ITag): JSX.Element {
  const animation = useRef(null);

  return (
    <Container>
      <LottieView
        autoPlay
        loop={false}
        duration={5000}
        ref={animation}
        style={{
          width: 18,
          height: 18,
        }}
        source={require('../../assets/stars.json')}
      />
      <Title
        style={{
          textAlign: 'center',
          width: '65%',
        }}
      >
        {label}
      </Title>
    </Container>
  );
}
