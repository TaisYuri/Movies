import React from "react";
import { BoxNote, Poster, Note ,Container, BoxRelease} from "./styles";

interface ICard {
  uri: string;
  vote?: string;
  release?: string;
  onPress?: ()=> void;
}

export function Card({ uri, vote, release, onPress }: ICard) {
  return (
    <Container onPress={onPress}>
      <Poster
        source={{ uri: `https://image.tmdb.org/t/p/w500/${uri}` }}
        resizeMode="contain"
      />
     {Boolean(vote) && 
      <BoxNote>
        <Note>{vote?.length > 2 ? Number(vote).toFixed(1) : `${vote}.0` }</Note>
      </BoxNote>}

     {Boolean(release) && 
      <BoxRelease>
        <Note style={{fontWeight: 'bold'}}>{release}</Note>
      </BoxRelease>}
    </Container>
  );
}
