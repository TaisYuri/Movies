import React, { useEffect } from "react";
import { Banner } from "src/components/Banner";
import { Loading } from "src/components/Loading";
import { Scroll } from "./styles";
import { ListCards } from "src/components/ListCards";
import { useGetMovies } from "src/hooks/useGetMovies";
import { useGetUpcoming } from "src/hooks/useGetUpcoming";
import { useGetTv } from "src/hooks/useGetTv";

export function Home() {
  const nowPlaying = useGetMovies({ page: "1" });
  const popular = useGetMovies({ page: "1" });
  const topRated = useGetMovies({ page: "1" });
  const { getMoviesUpComing, movieUpComing, isLoadingUpComing } =
    useGetUpcoming({ page: "1" });
  const { getTv, tv, isLoadingTv } = useGetTv();

  useEffect(() => {
    nowPlaying.getMovies("now_playing");
    popular.getMovies("popular");

    topRated.getMovies("top_rated");

    // FILTRAR TODOS COM DATA SUPERIOR A DATA ATUAL
    // ORDENANDO POR DATA
    getMoviesUpComing("upcoming");
    getTv();
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
