import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {useNavigation} from '@react-navigation/native'
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { BoxCard, ContainerBox, Scroll } from "./styles";

type RouteParams = {
  title: string;
  films: IMovies[];
};

type IMovies = {
  id: string;
  title: string;
  spoken_languages: Array<string>;
  poster_path: string;
  release_date: string;
  tagline: string;
  vote_average: string;
  genres: Array<string>;
  vote_count: string;
};

export function ActionMenu() {
  const route = useRoute();
  const { title, films } = route.params as RouteParams;
  const navigation = useNavigation();

  const [data, setData] = useState<IMovies[]>([]);

  useFocusEffect( useCallback( () => {
    setData(films)

    return () => setData([])
  },[data]))  
      

  return (
    <>
      <Header title={title} goBack={()=> navigation.goBack()}/>
      <Scroll>
        <ContainerBox>
          {data.map(
            (item: IMovies) =>
              Number(item.vote_average) !== 0 && (
                <BoxCard key={item.id}>
                  <Card
                    key={item.id}
                    vote={String(item.vote_average)}
                    uri={item.poster_path}
                    onPress={ ()=> navigation.navigate('details', {id: item.id})}
                  />
                </BoxCard>
              )
          )}
        </ContainerBox>
      </Scroll>
    </>
  );
}
