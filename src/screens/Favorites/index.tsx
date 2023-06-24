import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Card } from 'src/components/Card';
import { DataProps } from 'src/components/ListCards/types';
import { useFavorite } from 'src/hooks/useFavorite';
import { BoxCard } from '../Home/styles';
import { Header } from 'src/components/Header';
import { ContainerBox, Scroll } from '../PlusMovies/styles';
import { Loading } from 'src/components/Loading';
import { Snackbar } from 'react-native-paper';

export function Favorites(): JSX.Element {
  const { favorites, getFavorite, loading, removeFavorite } = useFavorite();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => {
    setVisible(!visible);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };
  useFocusEffect(
    useCallback(() => {
      getFavorite();
    }, [])
  );

  const handleLongPress = useCallback((id: string) => {
    removeFavorite(id);
    getFavorite();
  }, []);

  if (loading) {
    return <Loading />;
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
                  hasFavorite
                  onPressFavorite={() => {
                    onToggleSnackBar();
                    handleLongPress(item.id);
                  }}
                />
              </BoxCard>
            );
          })}
        </ContainerBox>
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          Removido dos favoritos!
        </Snackbar>
      </Scroll>
    </>
  );
}
