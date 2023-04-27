import React, {  useEffect, useState } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import api from "src/services/api";
import { BoxLoading, BoxVideo, Container, Title, VIDEO_HEIGHT } from "./styles";
import { ITrailer, ITrailerProps } from "./types";
import { API_KEY, LANGUAGE } from "src/env";

export function Trailer({ movie_id }: ITrailer) {
  const [trailer, setTrailer] = useState<ITrailerProps[]>([]);
  const [videoReady, setVideoReady] = useState(false);

  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width;

  async function getTrailers() {
    await api
      .get(
        `/${movie_id}/videos?api_key=${API_KEY}&language=${LANGUAGE}`
      )
      .then((response) => {
        setTrailer(response.data.results);
      });
  }

  useEffect(() => {
    getTrailers();
  }, []);


  return (
    <Container>
         {trailer?.map( (item) => {
          return (
            <View key={item.key}>
            <Title>{item.name}</Title>
          <BoxVideo>
            <YoutubeIframe
              videoId={item.key}
              height={videoReady ? VIDEO_HEIGHT: 0}
              width={VIDEO_WIDTH}
              onReady={() => setVideoReady(true)}
              // onFullScreenChange={onFullScreenChange}
            />

            {!videoReady && <BoxLoading><ActivityIndicator size="large" color={'#FF4451'}/></BoxLoading>}
          </BoxVideo></View>
          )
         }) }
  
    </Container>
  );
}
