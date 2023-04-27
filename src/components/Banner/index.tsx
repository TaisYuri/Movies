import React from "react";
import { ImageBackground, Text } from "react-native";
import {
  Note,
  ColorBackground,
  Buttons,
  Information,
  Title,
  ButtonPlay,
  ButtonTitle,
  ButtonList,
} from "./styles";
import { IBanner } from "./types";
import { LinearGradient } from "expo-linear-gradient";

export function Banner({ data, filePath }: IBanner) {
  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/w500/${filePath}` }}
      // style={{ width: "100%", height: 360}}
      // resizeMode='contain'
    >
      <LinearGradient
        colors={[
          "transparent",
          "transparent",
          "#1f222a1c",
          "#1f222ace",
          "#1f222a",
        ]}
        // style={{ width: "100%" , height: '100%'}}
      >
      <ColorBackground>
        {/* <Information>
          <Title>{data?.title}</Title>
          <Note numberOfLines={2} ellipsizeMode="tail">
            {data?.overview}
          </Note>
          <Buttons>
            <ButtonPlay>
              <ButtonTitle>Play</ButtonTitle>
            </ButtonPlay>
            <ButtonList>
              <ButtonTitle>+ My List</ButtonTitle>
            </ButtonList>
          </Buttons>
        </Information> */}
      </ColorBackground>
      </LinearGradient>
    </ImageBackground>
  );
}
