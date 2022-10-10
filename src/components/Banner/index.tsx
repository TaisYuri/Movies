import React from "react";
import { ImageBackground, Text } from "react-native";
import { Genres } from "../../datas/Genres";
import {
  Note,
  ColorBackground,
  Buttons,
  Information,
  Title,
  BoxNote,
  ButtonPlay,
  ButtonTitle,
  ButtonList,
} from "./styles";

interface IBanner {
  data?: any;
  uri?: string;
  vote?: string;
  genre_ids?: string[];
}

export function Banner({ data }: IBanner) {
  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}` }}
      style={{ width: "100%", height: 360}}
      // resizeMode='stretch'
    >
      <ColorBackground>
        <Information>
          <Title>{data.title}</Title>
          <Note numberOfLines={2} ellipsizeMode="tail">
            {data.overview}
          </Note>
          <Buttons>
            <ButtonPlay>
              <ButtonTitle>Play</ButtonTitle>
            </ButtonPlay>
            <ButtonList>
              <ButtonTitle>+ My List</ButtonTitle>
            </ButtonList>
          </Buttons>
        </Information>
      </ColorBackground>
    </ImageBackground>
  );
}
