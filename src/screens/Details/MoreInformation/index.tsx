import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
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
  BoxSimiliar
} from "./styles";
import { IPerson, RouteParams } from "./types";
import { CardPerson } from "../../../components/CardPerson";
import { ConexionApi } from "../../../../services/ConectionApi";
import { ListCards } from "../../../components/ListCards";

export function MoreInformation() {
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const [person, SetPerson] = useState([]);
  const [crew, SetCrew] = useState([]);
  const [similar, SetSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      ConexionApi(
        `/${id}/credits`,
        (response) => {
          SetPerson(response.data.cast);
          SetCrew(response.data.crew);
        },
        setLoading
      );
      ConexionApi(
        `/${id}/similar`,
        (response) => {
          SetSimilar(response.data.results);
        },
        setLoading
      );

      return () => {
        SetPerson([]);
      };
    }, [id])
  );

  const renderItem: ListRenderItem<IPerson> = ({ item }) => (
    <BoxCard>
      <CardPerson
        id={item.id}
        name={item.name}
        profile_path={item.profile_path}
        character={item.character}
      />
    </BoxCard>
  );

  if (loading) {
    return (
      <ContainerLoading>
        <ActivityIndicator />
      </ContainerLoading>
    );
  }

  return (
      <Container>
        <BoxPerson>
          {Boolean(person.length > 0) &&<Title>Elenco principal</Title>}
          <FlatList
            data={person.slice(0, 10)}
            renderItem={renderItem}
            keyExtractor={(item: IPerson) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </BoxPerson>
        {crew.map(
          (item) =>
            item.job === "Director" && (
              <Label key={item.credit_id}>
                Diretor:{" "}
                <SubTitle key={item.credit_id}>{item.original_name}</SubTitle>
              </Label>
            )
        )}
        {similar.length > 0 && (
          <BoxSimiliar>
            <ListCards title={"Recomendações"} dataMovies={similar} textLink={''}/>
          </BoxSimiliar>
        )}
      </Container>
  );
}
