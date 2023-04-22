import React, { useEffect, useState } from "react";
import { Banner } from "../../components/Banner";
import { Loading } from "../../components/Loading";
import { Scroll } from "./styles";
import { ListCards } from "../../components/ListCards";
import {  useGetMovies } from "../../hooks/useGetMovies";
import { useGetUpcoming } from "../../hooks/useGetUpcoming";
import { useGetTv } from "../../hooks/useGetTv";

export function Home() {

  const nowPlaying = useGetMovies({ page: "1" });
  const popular = useGetMovies({ page: "1" });
  const topRated = useGetMovies({ page: "1" });
  const { getMoviesUpComing, movieUpComing, isLoadingUpComing } =
  useGetUpcoming({ page: "1" });
  const {getTv, tv, isLoadingTv} = useGetTv();

  useEffect(() => {
    nowPlaying.getMovies("now_playing");
    popular.getMovies("popular");

    topRated.getMovies("top_rated");

    // FILTRAR TODOS COM DATA SUPERIOR A DATA ATUAL
    // ORDENANDO POR DATA
    getMoviesUpComing("upcoming");
    getTv();
    // async function airingToday() {
    //   await apiTv

    //     .get(
    //       "on_the_air?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US&page=1"
    //     )
    //     .then((response) => setTv(response.data.results))
    //     .catch((err) => {
    //       console.error("ops! ocorreu um erro" + err);
    //     });
    // }
    // airingToday();

  }, []);

  if (
    popular.isLoading ||
    topRated.isLoading ||
    nowPlaying.isLoading ||
    isLoadingUpComing ||
    isLoadingTv
  ) {
    return <Loading />;
  }

  return (
    <Scroll>
      <Banner data={popular?.value[0]} />
      <ListCards title="Top 10 Filmes populares" dataMovies={popular.value} />
      <ListCards title="Melhores avaliações" dataMovies={topRated.value} />
      <ListCards title="Top Filmes no cinema" dataMovies={nowPlaying.value} />
      <ListCards
        title="Próximos lançamentos"
        dataMovies={movieUpComing}
        newMovies={true}
      />
      <ListCards title="Top Series" dataMovies={tv} />
    </Scroll>
  );
}
