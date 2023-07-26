import React, { useCallback, useEffect, useState } from 'react';
import { Banner } from 'src/components/Banner';
import { Loading } from 'src/components/Loading';
import { Scroll } from './styles';
import { ListCards } from 'src/components/ListCards';
import { useGetMovies } from 'src/hooks/useGetMovies';
import { useGetUpcoming } from 'src/hooks/useGetUpcoming';
import { useGetTv } from 'src/hooks/useGetTv';
import { RefreshControl, View } from 'react-native';
import { useGetImage } from 'src/hooks/useGetImage';
import { useFavorite } from 'src/hooks/useFavorite';

export function Home(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const nowPlaying = useGetMovies({ page: '1' });
  const popular = useGetMovies({ page: '1' });
  const topRated = useGetMovies({ page: '1' });
  const { getMoviesUpComing, movieUpComing, isLoadingUpComing } =
    useGetUpcoming({ page: '1' });
  const { getTv, tv, isLoadingTv } = useGetTv();
  const topRatedTv = useGetTv();
  const { getImage, filePath, isLoadingImage } = useGetImage();
  const { getFavorite } = useFavorite();

  function getConnectionApi(): void {
    popular.getMovies('/popular', 'movie');
    nowPlaying.getMovies('/now_playing', 'movie');
    topRated.getMovies('/top_rated', 'movie');

    // FILTRAR TODOS COM DATA SUPERIOR A DATA ATUAL
    // ORDENANDO POR DATA
    getMoviesUpComing('upcoming');
    getTv({ type: 'popular' });
    topRatedTv.getTv({ type: 'top_rated' });
  }

  function getImageByPopular(): void {
    if (popular.value.length > 0) {
      const random = Math.floor(Math.random() * popular.value.length);
      getImage(popular?.value[random].id, 'movie');
    }
  }

  useEffect(() => {
    getConnectionApi();
  }, []);

  useEffect(() => {
    getImageByPopular();
  }, [popular.value]);

  useEffect(() => {
    getFavorite();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getConnectionApi();
      getImageByPopular();
      getFavorite();
    }, 200);
  }, []);

  if (
    popular.isLoading ||
    topRated.isLoading ||
    nowPlaying.isLoading ||
    isLoadingUpComing ||
    isLoadingTv ||
    isLoadingImage
  ) {
    return <Loading />;
  }

  return (
    <Scroll
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Banner data={popular?.value[0]} filePath={filePath?.poster} />
      <View style={{ marginTop: -170, marginBottom: 20 }}>
        <ListCards
          title="Filmes populares"
          dataMovies={popular.value}
          type="movie"
        />
        <ListCards
          title="Melhores avaliações"
          dataMovies={topRated.value}
          type="movie"
        />
        <ListCards
          title="Top Filmes no cinema"
          dataMovies={nowPlaying.value}
          type="movie"
        />
        <ListCards
          title="Próximos lançamentos"
          dataMovies={movieUpComing}
          newMovies={true}
          type="movie"
        />
        <ListCards title="Series do momento" dataMovies={tv} type="tv" />
        <ListCards
          title="Series com boas avaliações"
          dataMovies={topRatedTv.tv}
          type="tv"
        />
      </View>
    </Scroll>
  );
}
