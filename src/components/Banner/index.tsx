import React from 'react';
import { ImageBackground } from 'react-native';
import { ColorBackground } from './styles';
import { type IBanner } from './types';
import { LinearGradient } from 'expo-linear-gradient';

export function Banner({ filePath }: IBanner): JSX.Element {
  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/w500/${filePath}` }}
    >
      <LinearGradient
        colors={[
          'transparent',
          'transparent',
          '#1f222a1c',
          '#1f222ace',
          '#1f222a',
        ]}
      >
        <ColorBackground></ColorBackground>
      </LinearGradient>
    </ImageBackground>
  );
}
