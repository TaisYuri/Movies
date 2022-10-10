import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  Text,
  View,
} from "react-native";
import api, { apiTv } from "../../../services/api";
import { Banner } from "../../components/Banner";
import { Card } from "../../components/Card";
import { HeaderType } from "../../components/HeaderType";
import { BoxCard, ContainerBox } from "./styles";
import { IMovies } from "./types";



export function Home() {
  // const route = useRoute();
  // const { user } = route.params as RouteParams;

  const navigation = useNavigation();
  
  const [popular, setPopular] = useState<IMovies[]>([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [tv, setTv] = useState([]);
  const [film, setFilm] = useState([]);

  useEffect(() => {
    async function popularFilms(){
      await api
        .get('popular?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US&page=1')
        .then( (response) => { setPopular((response.data.results)); setFilm(response.data.results[0]) })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        })

      }
      popularFilms();

    async function nowPlaying(){
      await api
      .get('now_playing?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US')
      .then( (response) => setNowPlaying((response.data.results)))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      })
    }
    nowPlaying();

    async function topRated(){
      await api
      .get('top_rated?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US&page=1')
      .then( (response) => setTopRated((response.data.results)))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      })
    }
    topRated();

    async function upcoming(){
      await api
      .get('upcoming?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US&page=5')
      .then( (response) => setUpcoming((response.data.results)))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      })
    }
    upcoming();

    async function airingToday(){
      await apiTv
      .get('on_the_air?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US&page=1')
      .then( (response) => setTv((response.data.results)))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      })
    }
    airingToday();

    
    return setPopular([]), setFilm([]);

  }, []);


  const renderItem: ListRenderItem<IMovies> = ({ item }) => (
    <BoxCard>
      <Card vote={String(item.vote_average)} uri={item.poster_path} onPress={ ()=> navigation.navigate('details', {id: item.id})}/>
    </BoxCard>
  );


  return (
    <ScrollView style={{ backgroundColor: "#1F222A" }}>

      <Banner data={film} />
      <View style={{ marginHorizontal: 16 }}>
        <HeaderType title="Top 10 popular Movies" textLink="see more" link={() => {navigation.navigate('actionMenu', {title:"Top 10 Movies popular", films:popular})}}/>
        <FlatList
          data={popular.slice(0,10)}
          renderItem={renderItem}
          keyExtractor={(item: IMovies) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <HeaderType title="Top rated" textLink="see more" link={() => {navigation.navigate('actionMenu', {title:"Top rated", films: topRated})}}/>
        <FlatList
          data={topRated.slice(0,10)}
          renderItem={renderItem}
          keyExtractor={(item: IMovies) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>

      <View style={{ marginHorizontal: 16 }}>
        <HeaderType title="Top Movies in theatres" textLink="see more" link={() => {navigation.navigate('actionMenu', {title:"Top Movies in theatres", films: nowPlaying})}}/>
        <FlatList
          data={nowPlaying.slice(0,10)}
          renderItem={renderItem}
          keyExtractor={(item: IMovies) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>

      <View style={{ marginHorizontal: 16 }}>
        <HeaderType title="Upcoming movies in theatres" textLink="see more" link={() => {navigation.navigate('actionMenu', {title:"Upcoming movies in theatres", films:upcoming})}}/>
        <ScrollView horizontal>
          {upcoming.slice(0,10).map(
            (item: IMovies) =>
              item.release_date > "2022-09-01" && (
                <BoxCard key={item.id}>
                  <Card
                    key={item.id}
                    uri={item.poster_path}
                    release={item.release_date}
                  />
                </BoxCard>
              )
          )}
        </ScrollView>
      </View>

      <View style={{ marginHorizontal: 16 }}>
        <HeaderType title="Top series on TV" textLink="see more" link={() => {navigation.navigate('actionMenu', {title:"List of TV shows that are airing today", films: nowPlaying})}}/>
        <FlatList
          data={tv.slice(0,10)}
          renderItem={renderItem}
          keyExtractor={(item: IMovies) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>

    </ScrollView>
  );
}
