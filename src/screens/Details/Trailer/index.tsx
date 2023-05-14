import React, { useEffect, useState } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import api from 'src/services/api';
import { BoxLoading, BoxVideo, Container, Title, VIDEO_HEIGHT } from './styles';
import { ITrailer, ITrailerProps } from './types';
import Constants from 'expo-constants';

export function Trailer({ movieId }: ITrailer): JSX.Element {
  const [trailer, setTrailer] = useState<ITrailerProps[]>([]);
  const [videoReady, setVideoReady] = useState(false);

  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width;

  async function getTrailers(): Promise<void> {
    await api
      .get(
        `/${movieId}/videos?api_key=${Constants?.expoConfig?.extra?.api_key}&language=pt-BR`
      )
      .then((response) => {
        setTrailer(response.data.results);
      })
      .catch((err) => {
        console.log(`ops! ${err}`);
      });
  }

  useEffect(() => {
    void getTrailers();
  }, []);

  return (
    <Container>
      {trailer?.map((item) => {
        return (
          <View key={item.key}>
            <Title>{item.name}</Title>
            <BoxVideo>
              <YoutubeIframe
                videoId={item.key}
                height={videoReady ? VIDEO_HEIGHT : 0}
                width={VIDEO_WIDTH}
                onReady={() => {
                  setVideoReady(true);
                }}
                // onFullScreenChange={onFullScreenChange}
              />

              {!videoReady && (
                <BoxLoading>
                  <ActivityIndicator size="large" color={'#FF4451'} />
                </BoxLoading>
              )}
            </BoxVideo>
          </View>
        );
      })}
    </Container>
  );
}
