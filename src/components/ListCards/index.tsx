import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderType } from '../HeaderType';
import { ContainerBox } from './styles';
import { IListCards } from './types';
import { IMovies } from '../../screens/Home/types';
import { BoxCard } from '../../screens/Home/styles';
import { Card } from '../Card';

export function ListCards({
  title,
  dataMovies,
  newMovies = false,
  textLink = 'ver mais',
}: IListCards): JSX.Element {
  const navigation = useNavigation();

  const renderItem: ListRenderItem<IMovies> = ({ item }) => (
    <BoxCard>
      <Card
        title={item.title}
        vote={String(item.vote_average)}
        uri={item.poster_path}
        onPress={() => {
          navigation.navigate('details', { id: item.id });
        }}
        release={newMovies ? item.release_date : ''}
      />
    </BoxCard>
  );

  return (
    <ContainerBox>
      <HeaderType
        title={title}
        textLink={textLink}
        link={() => {
          navigation.navigate('actionMenu', {
            title,
            films: dataMovies,
            newMovies,
          });
        }}
      />
      <FlatList
        data={dataMovies.slice(0, 10)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </ContainerBox>
  );
}
