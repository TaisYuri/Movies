import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, ListRenderItem, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BoxCard, Container, Label, SubTitle, Title } from "./styles";

import { IMovieDetails, IPerson, RouteParams } from "./types";
import LottieView from "lottie-react-native";
import api from "../../../../services/api";
import { CardPerson } from "../../../components/CardPerson";
import { Card } from "../../../components/Card";
import { IMovies } from "../../Home/types";

export function MoreInformation() {
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const navigation = useNavigation();
  const animation = useRef(null);

  const [movie, setMovie] = useState<IMovieDetails>({} as IMovieDetails);
  const [person, SetPerson] = useState([]);
  const [crew, SetCrew] = useState([]);
  const [similar, SetSimilar] = useState([]);
  const [loading, setLoading] = useState(false);

  async function personDetail(item: string) {
    setLoading(true);
    await api
      .get(
        `/${item}/credits?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US`
      )
      .then((response) => {
        SetPerson(response.data.cast);
        SetCrew(response.data.crew);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }
  async function similarDetail(item: string) {
    setLoading(true);

    await api
      .get(
        `/${item}/similar?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US&page=1`
      )
      .then((response) => {
        SetSimilar(response.data.results);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  useFocusEffect(
    useCallback(() => {
      personDetail(id);
      similarDetail(id);

      return () => {
        setMovie({} as IMovieDetails);
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

  const renderItemMovie: ListRenderItem<IMovies> = ({ item }) => (
    <BoxCard>
      <Card
        vote={String(item.vote_average)}
        uri={item.poster_path}
        onPress={() => navigation.navigate("details", { id: item.id })}
      />
    </BoxCard>
  );

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //       <LottieView
  //         autoPlay
  //         ref={animation}
  //         style={{
  //           width: 200,
  //           height: 200,
  //           backgroundColor: "#fff",
  //         }}
  //         source={require("../../../assets/movie_lottie.json")}
  //       />
  //     </View>
  //   );
  // }
  return (
    <ScrollView>
      <Container>
        <View style={{ paddingTop: 16, paddingBottom: 16 }}>
          <Title style={{ paddingBottom: 8 }}>Elenco principal</Title>
          <FlatList
            data={person.slice(0, 10)}
            renderItem={renderItem}
            keyExtractor={(item: IPerson) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
        {crew.map(
          (item) =>
            item.job === "Director" && (
              <Label key={item.credit_id}>
                Diretor:{" "}
                <SubTitle key={item.credit_id}>{item.original_name}</SubTitle>
              </Label>
            )
        )}
        {crew.map(
          (item) =>
            item.job === "Music" && (
              <Label key={item.credit_id}>
                Music:{" "}
                <SubTitle key={item.credit_id}>{item.original_name}</SubTitle>
              </Label>
            )
        )}
        {crew.map(
          (item) =>
            item.job === "Characters" && (
              <Label key={item.credit_id}>
                Personagens:{" "}
                <SubTitle key={item.credit_id}>{item.original_name}</SubTitle>
              </Label>
            )
        )}

        <View style={{ marginBottom: 10 }}>
          <Title style={{ paddingBottom: 8 }}>Recomendações</Title>
          <FlatList
            data={similar}
            renderItem={renderItemMovie}
            keyExtractor={(item: IMovies) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </Container>
    </ScrollView>
  );
}
