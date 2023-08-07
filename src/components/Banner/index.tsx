import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { ColorBackground, ContainerLoading } from './styles';
import { type IBanner } from './types';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';

export function Banner({ filePath }: IBanner): JSX.Element {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/w500/${filePath}` }}
      onLoadStart={() => {
        setLoading(true);
      }}
      onLoadEnd={() => {
        setLoading(false);
      }}
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
        {loading ? (
          <ContainerLoading>
            <ActivityIndicator color={theme.colors.primary} />
          </ContainerLoading>
        ) : (
          <ColorBackground></ColorBackground>
        )}
      </LinearGradient>
    </ImageBackground>
  );
}
