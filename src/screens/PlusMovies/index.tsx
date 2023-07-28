import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import { Card } from 'src/components/Card';
import { Header } from 'src/components/Header';
import { BoxCard, ContainerBox, Scroll } from './styles';
import { RouteParams } from './types';
import { DataProps } from 'src/components/ListCards/types';

export function ActionMenu(): JSX.Element {
  const route = useRoute();
  const { title, films, newMovies, type } = route.params as RouteParams;

  const navigation = useNavigation();
  const [data, setData] = useState<DataProps[]>([]);

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
        <Header title={title} />
        <Scroll>
          <ContainerBox>
            {data.map((item: DataProps) => (
              <BoxCard key={item.id}>
                <Card
                  key={item.id}
                  title=""
                  uri={item.poster_path}
                  onPress={() => {
                    navigation.navigate('details', {
                      id: item.id,
                      type,
                    });
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
      <Header title={title} />
      <Scroll>
        <ContainerBox>
          {data.map(
            (item: DataProps) =>
              Number(item.vote_average) !== 0 && (
                <BoxCard key={item.id}>
                  <Card
                    title=""
                    key={item.id}
                    vote={String(item.vote_average)}
                    uri={item.poster_path}
                    onPress={() => {
                      navigation.navigate('details', {
                        id: item.id,
                        type,
                      });
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
