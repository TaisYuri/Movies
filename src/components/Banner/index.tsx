import React from 'react';
import { ImageBackground } from 'react-native';
import { ColorBackground } from './styles';
import { type IBanner } from './types';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'styled-components/native';

export function Banner({ filePath }: IBanner): JSX.Element {
  const theme = useTheme();
  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/w500/${filePath}` }}
    >
      <LinearGradient
        colors={[
          'transparent',
          // 'transparent',
          theme.colors.grays.grayscale_100,
          theme.colors.grays.grayscale_100,
          theme.colors.grays.grayscale_200,
          theme.colors.grays.grayscale_300,
        ]}
      >
        <ColorBackground></ColorBackground>
      </LinearGradient>
    </ImageBackground>
  );
}
