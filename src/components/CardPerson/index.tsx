import React from "react";
import { BoxRelease, Container, Note, Poster } from "./styles";

interface ICardPerson {
  id: string;
  name: string;
  profile_path: string;
  character: string;
  onPress?: () => void;
}

export function CardPerson({
  character,
  id,
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
