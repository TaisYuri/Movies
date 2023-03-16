import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, useWindowDimensions } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import * as ScreenOrientation from "expo-screen-orientation";
import api from "../../../../services/api";
import { BoxVideo, Container, Title } from "./styles";
import { ITrailer, ITrailerProps } from "./types";

export function Trailer({ movie_id }: ITrailer) {
  const [trailer, setTrailer] = useState<ITrailerProps[]>([]);
  const [videoReady, setVideoReady] = useState(false);

  const { width } = useWindowDimensions();
  const VIDEO_HEIGHT = 210;
  const VIDEO_WIDTH = width;

  async function getTrailers() {
    await api
      .get(
        `/${movie_id}/videos?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=pt-BR`
      )
      .then((response) => {
        setTrailer(response.data.results);
      });
  }

  useEffect(() => {
    getTrailers();
  }, []);

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  return (
    <Container>
      {trailer.map((item) => {
        return(
          <>
          <Title>{item.name}</Title>
          <BoxVideo>
            <YoutubeIframe
              videoId={item.key}
              height={VIDEO_HEIGHT}
              width={VIDEO_WIDTH}
              onReady={() => setVideoReady(true)}
              onFullScreenChange={onFullScreenChange}
            />

            {!videoReady && <ActivityIndicator />}
          </BoxVideo>
        </>
        )
      })}
    </Container>
  );
}

// name
// key
// site
// official
// published_at

//https://youtu.be/qFWD0tBYbKw
