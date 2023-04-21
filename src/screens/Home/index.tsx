import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import { apiTv } from "../../../services/api";
import { ConexionApi } from "../../../services/ConectionApi";
import { Banner } from "../../components/Banner";
import { Loading } from "../../components/Loading";
import { Scroll } from "./styles";
import { IMovies } from "./types";
import { ListCards } from "../../components/ListCards";

export function Home() {

  const [popular, setPopular] = useState<IMovies[]>([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [tv, setTv] = useState([]);
  const [film, setFilm] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ConexionApi(
      "popular",
      (response) => {
        setPopular(response.data.results);
        setFilm(response.data.results[0]);
      },
      setLoading
    );

    ConexionApi(
      "now_playing",
      (response) => setNowPlaying(response.data.results),
      setLoading
    );

    ConexionApi(
      "top_rated",
      (response) => setTopRated(response.data.results),
      setLoading
    );

    // FILTRAR TODOS COM DATA SUPERIOR A DATA ATUAL
    // ORDENANDO POR DATA
    ConexionApi(
      "upcoming",
      (response) =>
        setUpcoming(
          response.data.results
            .filter(
              (item) =>
                item.release_date > format(new Date(Date.now()), "yyyy-MM-dd")
            )
            .sort((a, b) => a.release_date.localeCompare(b.release_date))
        ),
      setLoading
    );

    async function airingToday() {
      await apiTv
      
        .get(
          "on_the_air?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US&page=1"
        )
        .then((response) => setTv(response.data.results))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }
    airingToday();

    return setPopular([]), setFilm([]);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Scroll>
      <Banner data={film} />
      <ListCards title="Top 10 Filmes populares" dataMovies={popular} />
      <ListCards title="Melhores avaliações" dataMovies={topRated} />
      <ListCards title="Top Filmes no cinema" dataMovies={nowPlaying} />
      <ListCards title="Próximos lançamentos" dataMovies={upcoming} newMovies={true}/>
      <ListCards title="Top Series" dataMovies={tv} />
    </Scroll>
  );
}
