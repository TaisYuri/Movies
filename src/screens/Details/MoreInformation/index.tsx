import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import {
  BoxCard,
  Container,
  ContainerLoading,
  Label,
  ActivityIndicator,
  BoxPerson,
  BoxSimiliar,
  BoxDirector,
} from './styles';
import { RouteParams } from './types';
import { CardPerson } from 'src/components/CardPerson';
import { ListCards } from 'src/components/ListCards';
import { useGetMovies } from 'src/hooks/useGetMovies';
import { usePersonForMovie } from 'src/hooks/usePersonForMovie';
import { PersonProps } from 'src/hooks/usePersonForMovie/types';
import { Title } from 'src/components/Title';
import { typeDetailProps } from 'src/hooks/useHandleTypeDetails/types';
import { useRecommendationStore } from 'src/states/recomendationDefault';

export function MoreInformation(props: {
  detailType: typeDetailProps;
}): JSX.Element {
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const { getMovies, value, isLoading } = useGetMovies({ page: '1' });
  const { getPersons, PersonsOfMovies, isLoadingPerson } = usePersonForMovie();

  const { recommendationStore } = useRecommendationStore();

  useFocusEffect(
    useCallback(() => {
      getPersons(`/${id}/credits`, props.detailType);
      getMovies(`/${id}/recommendations`, props.detailType);
    }, [id])
  );

  const renderItem: ListRenderItem<PersonProps> = ({ item }) => (
    <BoxCard>
      <CardPerson
        id={item?.id}
        name={item?.name}
        profilePath={item?.profilePath}
        character={item?.character}
      />
    </BoxCard>
  );

  if (isLoading || isLoadingPerson) {
    return (
      <ContainerLoading>
        <ActivityIndicator />
      </ContainerLoading>
    );
  }
  return (
    <Container>
      <BoxPerson>
        {Boolean(
          PersonsOfMovies != null && PersonsOfMovies?.persons?.length > 0
        ) && <Title>Elenco principal</Title>}
        <FlatList
          data={PersonsOfMovies?.persons}
          renderItem={renderItem}
          keyExtractor={(item: PersonProps) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </BoxPerson>
      <BoxDirector>
        {Boolean(PersonsOfMovies?.director.length) && (
          <>
            <Title>Diretor</Title>
            <Label>
              <CardPerson
                id={PersonsOfMovies?.director[0].id}
                name={PersonsOfMovies?.director[0].name}
                profilePath={PersonsOfMovies?.director[0].profilePath}
                size="md"
              />
            </Label>
          </>
        )}
      </BoxDirector>

      {value.length > 0 ? (
        <BoxSimiliar>
          <ListCards
            title={'Recomendações'}
            dataMovies={value}
            textLink={''}
            type={props.detailType}
          />
        </BoxSimiliar>
      ) : (
        <BoxSimiliar>
          <ListCards
            title={'Recomendações'}
            dataMovies={recommendationStore}
            textLink={''}
            type={props.detailType}
          />
        </BoxSimiliar>
      )}
    </Container>
  );
}
