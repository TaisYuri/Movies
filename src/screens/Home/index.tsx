import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Banner } from "src/components/Banner";
import { Loading } from "src/components/Loading";
import { Scroll } from "./styles";
import { ListCards } from "src/components/ListCards";
import { useGetMovies } from "src/hooks/useGetMovies";
import { useGetUpcoming } from "src/hooks/useGetUpcoming";
import { useGetTv } from "src/hooks/useGetTv";
import { RefreshControl, View } from "react-native";
import { useGetImage } from "src/hooks/useGetImage";

export function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const nowPlaying = useGetMovies({ page: "1" });
  const popular = useGetMovies({ page: "1" });
  const topRated = useGetMovies({ page: "1" });
  const { getMoviesUpComing, movieUpComing, isLoadingUpComing } =
    useGetUpcoming({ page: "1" });
  const { getTv, tv, isLoadingTv } = useGetTv();
  const { getImage, filePath, isLoadingImage } = useGetImage();

  function getConnectionApi() {
    popular.getMovies("popular");
    nowPlaying.getMovies("now_playing");
    topRated.getMovies("top_rated");

    // FILTRAR TODOS COM DATA SUPERIOR A DATA ATUAL
    // ORDENANDO POR DATA
    getMoviesUpComing("upcoming");
    getTv();
  }

 async function getImageByPopular(){
    if (popular.value.length > 0) {
      const random = Math.floor(Math.random() * popular.value.length);
    await getImage(popular?.value[random].id);
    }
  }

  useEffect(() => {
    getConnectionApi();
  }, []);

  useEffect(() => {
    getImageByPopular()
  }, [popular.value]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getConnectionApi();
      getImageByPopular();
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
      <View style={{ marginTop: -170 }}>
        <ListCards title="Top 10 Filmes populares" dataMovies={popular.value} />
        <ListCards title="Melhores avaliações" dataMovies={topRated.value} />
        <ListCards title="Top Filmes no cinema" dataMovies={nowPlaying.value} />
        <ListCards
          title="Próximos lançamentos"
          dataMovies={movieUpComing}
          newMovies={true}
        />
        <ListCards title="Top Series" dataMovies={tv} />
      </View>
    </Scroll>
  );
}
