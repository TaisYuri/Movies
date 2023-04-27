import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";
import {
  BoxCard,
  Container,
  ContainerLoading,
  Label,
  SubTitle,
  Title,
  ActivityIndicator,
  BoxPerson,
  BoxSimiliar,
} from "./styles";
import { RouteParams } from "./types";
import { CardPerson } from "src/components/CardPerson";
import { ListCards } from "src/components/ListCards";
import { useGetMovies } from "src/hooks/useGetMovies";
import {
  usePersonForMovie,
} from "src/hooks/usePersonForMovie";
import { PersonProps } from "src/hooks/usePersonForMovie/types";

export function MoreInformation() {
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const { getMovies, value, isLoading } = useGetMovies({ page: "1" });
  const { getPersons, PersonsOfMovies, isLoadingPerson } = usePersonForMovie();

  useFocusEffect(
    useCallback(() => {
      getPersons(`/${id}/credits`);
      getMovies(`/${id}/similar`);
    }, [id])
  );

  const renderItem: ListRenderItem<PersonProps> = ({ item }) => (
    <BoxCard>
      <CardPerson
        id={item?.id}
        name={item?.name}
        profile_path={item?.profile_path}
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
        {Boolean(PersonsOfMovies?.persons?.length > 0) && (
          <Title>Elenco principal</Title>
        )}
        <FlatList
          data={PersonsOfMovies?.persons}
          renderItem={renderItem}
          keyExtractor={(item: PersonProps) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </BoxPerson>
      {PersonsOfMovies?.director.map((item) => (
        <Label key={item?.id}>
          Diretor: <SubTitle key={item?.id}>{item?.name}</SubTitle>
        </Label>
      ))}
      {value.length > 0 && (
        <BoxSimiliar>
          <ListCards title={"Recomendações"} dataMovies={value} textLink={""} />
        </BoxSimiliar>
      )}
    </Container>
  );
}
