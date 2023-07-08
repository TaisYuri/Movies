/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import {
  BoxLoading,
  BoxVideo,
  Container,
  ContentInfos,
  SubTitle,
  Content,
  ViewNotFind,
  TitleNotFind,
  SubtitleNotFind,
} from './styles';
import { ITrailer } from './types';
import { useRoute } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Zocial } from '@expo/vector-icons';
import { dateConvert } from 'src/functions/dateConvert/dateConvert';
import { Header } from 'src/components/Header';
import { useGetTrailers } from 'src/hooks/useGetTrailers';
import { Loading } from 'src/components/Loading';
import { useTheme } from 'styled-components/native';
import { Title } from 'src/components/Title';

export function Trailers(): JSX.Element {
  const routeNavigation = useRoute();
  const { movieId } = routeNavigation.params as ITrailer;
  const theme = useTheme();

  const [videoReady, setVideoReady] = useState(false);

  const { width, height } = useWindowDimensions();
  const VIDEO_WIDTH = width - 32;
  const VIDEO_HEIGHT2 = height / 4 - 8;

  const { getTrailers, isLoading, value } = useGetTrailers();

  useEffect(() => {
    getTrailers(movieId);
  }, []);

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  if (isLoading) {
    <Loading />;
  }

  return (
    <Container>
      <Header title="Trailers" />
      <Content>
        {value?.slice(0, 3)?.map((item) => {
          return (
            <View key={item.key}>
              <BoxVideo>
                <YoutubeIframe
                  videoId={item.key}
                  height={videoReady ? VIDEO_HEIGHT2 : 0}
                  width={VIDEO_WIDTH}
                  onReady={() => {
                    setVideoReady(true);
                  }}
                  onFullScreenChange={onFullScreenChange}
                />

                {!videoReady && (
                  <BoxLoading>
                    <ActivityIndicator
                      size="large"
                      color={theme.colors.primary}
                    />
                  </BoxLoading>
                )}
              </BoxVideo>
              <ContentInfos>
                <Zocial name="youtube" size={24} color="white" />
                <View>
                  <Title>{item.name}</Title>
                  <SubTitle>
                    {dateConvert(item.published_at).elapsedTime} ago
                  </SubTitle>
                </View>
              </ContentInfos>
            </View>
          );
        })}
      </Content>
      {value?.length === 0 && (
        <ViewNotFind>
          {/* <NoData width={200} height={200} /> */}

          <TitleNotFind>Ohhh no!</TitleNotFind>
          <SubtitleNotFind>
            Ainda não temos trailers disponiveis =/
          </SubtitleNotFind>
        </ViewNotFind>
      )}
    </Container>
  );
}
