import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  View,
} from "react-native";
import api from "../../../services/api";
import { Banner } from "../../components/Banner";
import { Card } from "../../components/Card";
import { HeaderType } from "../../components/HeaderType";
import { BoxCard, ContainerBox } from "./styles";

type RouteParams = {
  user: IMovies[];
};

type IMovies = {
  id: string;
  title: string;
  spoken_languages: Array<string>;
  poster_path: string;
  release_date: string;
  tagline: string;
  vote_average: string;
  genres: Array<string>;
  vote_count: string;
};

export function List() {
  const route = useRoute();
  const { user } = route.params as RouteParams;

  const [array, setArray] = useState(user);
  const [film, setFilm] = useState([]);
  const [popular, setPopular] = useState([]);

  let arrayIds: Array<any> = [];
  let banner = {}
  useEffect(() => {
    array.map((item) => arrayIds.push(item.id));

    arrayIds.map(
      async (item: string) =>
        await api
          .get(
            `/${item}?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US`
          )
          .then((response) => {
            setFilm((oldData): any => [
              ...oldData,
              {
                id: response.data.id,
                title: response.data.title,
                spoken_languages: response.data.spoken_languages,
                poster_path: response.data.poster_path,
                release_date: response.data.release_date,
                tagline: response.data.tagline,
                vote_average: response.data.vote_average,
                genres: response.data.genres,
                vote_count: response.data.vote_count,
              },
            ]);
           
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          })
    );

    async function popularFilms(){
      await api
        .get('popular?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US&page=1')
        .then( (response) => {
          setPopular(response.data.results) 
          
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        })
    }
    popularFilms();
    
    return setFilm([]), setPopular([]);
  }, []);


  const renderItem: ListRenderItem<IMovies> = ({ item }) => (
    <BoxCard>
      <Card vote={String(item.vote_average)} uri={item.poster_path} />
    </BoxCard>
  );

  return (
    <ScrollView style={{ backgroundColor: "#1F222A" }}>

      {/* <Banner uri={film[0].poster_path} /> */}

      <View style={{ marginHorizontal: 16 }}>
        <HeaderType title="Top 10 Movies this week" link="see more" />
        <ScrollView horizontal>
          {film.map(
            (item: IMovies) =>
              Number(item.vote_average) !== 0 && (
                <BoxCard key={item.id}>
                  <Card
                    key={item.id}
                    vote={String(item.vote_average)}
                    uri={item.poster_path}
                  />
                </BoxCard>
              )
          )}
        </ScrollView>
      </View>

      <View style={{ marginHorizontal: 16 }}>
        <HeaderType title="Top 10 Movies this week" link="see more" />
        <FlatList
          data={popular}
          renderItem={renderItem}
          keyExtractor={(item: IMovies) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>

      <View style={{ marginHorizontal: 16 }}>
        <HeaderType title="Top 10 Movies this week" link="see more" />
        <FlatList
          data={film}
          renderItem={renderItem}
          keyExtractor={(item: IMovies) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </ScrollView>
  );
}
