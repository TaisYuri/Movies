import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card } from "src/components/Card";
import { Header } from "src/components/Header";
import { BoxCard, ContainerBox, Scroll } from "./styles";
import { IMovies, RouteParams } from "./types";

export function ActionMenu() {
  const route = useRoute();
  const { title, films, newMovies } = route.params as RouteParams;

  const navigation = useNavigation();
  const [data, setData] = useState<IMovies[]>([]);

  useFocusEffect(
    useCallback(() => {
      setData(films);

      return () => setData([]);
    }, [data])
  );

  //RETORNA FILMES QUE AINDA NÃO FORAM LANÇADOS (POR DATA) E QUE NÃO TEM NOTA
  if (newMovies) {
    return (
      <>
        <Header title={title} goBack={() => navigation.goBack()} />
        <Scroll>
          <ContainerBox>
            {data.map((item: IMovies) => (
              <BoxCard key={item.id}>
                <Card
                  key={item.id}
                  title=""
                  uri={item.poster_path}
                  onPress={() =>
                    navigation.navigate("details", { id: item.id })
                  }
                  release={item.release_date}
                />
              </BoxCard>
            ))}
          </ContainerBox>
        </Scroll>
      </>
    );
  }

  return (
    <>
      <Header title={title} goBack={() => navigation.goBack()} />
      <Scroll>
        <ContainerBox>
          {data.map(
            (item: IMovies) =>
              Number(item.vote_average) !== 0 && (
                <BoxCard key={item.id}>
                  <Card
                    title=""
                    key={item.id}
                    vote={String(item.vote_average)}
                    uri={item.poster_path}
                    onPress={() =>
                      navigation.navigate("details", { id: item.id })
                    }
                  />
                </BoxCard>
              )
          )}
        </ContainerBox>
      </Scroll>
    </>
  );
}
