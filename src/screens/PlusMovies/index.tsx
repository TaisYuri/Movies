import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import { Card } from 'src/components/Card';
import { Header } from 'src/components/Header';
import { BoxCard, ContainerBox, Scroll } from './styles';
import { IMovies, RouteParams } from './types';

export function ActionMenu(): JSX.Element {
  const route = useRoute();
  const { title, films, newMovies } = route.params as RouteParams;

  const navigation = useNavigation();
  const [data, setData] = useState<IMovies[]>([]);

  useFocusEffect(
    useCallback(() => {
      setData(films);

      return () => {
        setData([]);
      };
    }, [data])
  );

  // RETORNA FILMES QUE AINDA NÃO FORAM LANÇADOS (POR DATA) E QUE NÃO TEM NOTA
  if (newMovies ?? false) {
    return (
      <>
        <Header
          title={title}
          goBack={() => {
            navigation.goBack();
          }}
        />
        <Scroll>
          <ContainerBox>
            {data.map((item: IMovies) => (
              <BoxCard key={item.id}>
                <Card
                  key={item.id}
                  title=""
                  uri={item.poster_path}
                  onPress={() => {
                    navigation.navigate('details', { id: item.id });
                  }}
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
      <Header
        title={title}
        goBack={() => {
          navigation.goBack();
        }}
      />
      <Scroll>
        <ContainerBox>
          {data.map(
            (item: IMovies) =>
              Number(item.voteAverage) !== 0 && (
                <BoxCard key={item.id}>
                  <Card
                    title=""
                    key={item.id}
                    vote={String(item.voteAverage)}
                    uri={item.poster_path}
                    onPress={() => {
                      navigation.navigate('details', { id: item.id });
                    }}
                  />
                </BoxCard>
              )
          )}
        </ContainerBox>
      </Scroll>
    </>
  );
}
