import React from "react";
import { BoxRelease, Container, Note, Poster } from "./styles";
import { ICardPerson } from "./types";

export function CardPerson({
  character,
  name,
  profile_path,
  onPress,
}: ICardPerson) {
  return (
    <Container onPress={onPress}>
      <Poster
        source={{ uri: `https://image.tmdb.org/t/p/w500/${profile_path}` }}
        resizeMode="contain"
      />

      <BoxRelease>
        <Note>{name}</Note>
        <Note style={{ fontWeight: "bold" }}>{character}</Note>
      </BoxRelease>
    </Container>
  );
}
