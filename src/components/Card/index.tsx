import React from "react";
import {
  BoxNote,
  Poster,
  Note,
  Container,
  BoxRelease,
  PosterWithoutImg,
  TextWithoutImg,
} from "./styles";
import { ICard } from "./types";

export function Card({ uri,title, vote, release, onPress }: ICard) {

  return (
    <Container onPress={onPress}>
      {uri !== undefined && uri !== null ? (
        <Poster
          source={{ uri: `https://image.tmdb.org/t/p/w500/${uri}` }}
          resizeMode="contain"
        />
      ) : (
        <PosterWithoutImg>
          <TextWithoutImg>{title}</TextWithoutImg>
        </PosterWithoutImg>
      )}

      {(Boolean(vote) && Boolean(Number(vote) > 0))&& (
        <BoxNote>
          <Note>
            {vote?.length > 2 ? Number(vote).toFixed(1) : `${vote}.0`}
          </Note>
        </BoxNote>
      )}

      {Boolean(release) && (
        <BoxRelease>
          <Note style={{ fontWeight: "bold" }}>{release}</Note>
        </BoxRelease>
      )}
    </Container>
  );
}
