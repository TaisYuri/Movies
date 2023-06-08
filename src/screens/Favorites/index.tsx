import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Card } from 'src/components/Card';
import { DataProps } from 'src/components/ListCards/types';
import { useFavorite } from 'src/hooks/useFavorite';
import { BoxCard } from '../Home/styles';
import { Header } from 'src/components/Header';
import { ContainerBox, Scroll } from '../PlusMovies/styles';
import { Loading } from 'src/components/Loading';

export function Favorites(): JSX.Element {
  const { favorites, getFavorite, loading, removeFavorite } = useFavorite();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getFavorite();
    }, [])
  );

  const handleLongPress = useCallback((id: string) => {
    removeFavorite(id);
  }, []);

  if (loading) {
    <Loading />;
  }

  return (
    <>
      <Header title="Favoritos" />
      <Scroll>
        <ContainerBox>
          {favorites?.map((item: DataProps) => {
            return (
              <BoxCard key={item.id}>
                <Card
                  title=""
                  key={item.id}
                  vote={String(item.vote_average)}
                  uri={item.poster_path}
                  onPress={() => {
                    navigation.navigate('details', { id: item.id });
                  }}
                  onLongPress={() => {
                    handleLongPress(item.id);
                  }}
                />
              </BoxCard>
            );
          })}
        </ContainerBox>
      </Scroll>
    </>
  );
}
