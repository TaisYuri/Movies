import { useCallback, useState } from "react";
import api from "src/services/api";
import { IMovies } from "src/screens/Home/types";
import { format } from "date-fns";
import { GetMoviesProps } from "../useGetMovies/types";
import { API_KEY, LANGUAGE } from "src/env";

export function useGetUpcoming({ page }: GetMoviesProps): {
  getMoviesUpComing: (link: string) => void;
  movieUpComing: IMovies[];
  isLoadingUpComing: Boolean;
} {
  const [isLoadingUpComing, setIsLoadingUpComing] = useState(false);
  const [movieUpComing, setMovieUpComing] = useState<IMovies[]>([]);

  const getMoviesUpComing = useCallback(
    (link: string) => {
      setIsLoadingUpComing(true);
      api
        .get(
          `${link}?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`
        )
        .then(({ data }) => {
          setMovieUpComing(
            data.results
              // FILTRAR TODOS COM DATA SUPERIOR A DATA ATUAL
              // ORDENANDO POR DATA
              .filter(
                (item) =>
                  item.release_date > format(new Date(Date.now()), "yyyy-MM-dd")
              )
              .sort((a, b) => a.release_date.localeCompare(b.release_date))
          );
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
          setMovieUpComing([]);
        })
        .finally(() => {
          setIsLoadingUpComing(false);
        });
    },
    [setMovieUpComing, page]
  );

  return {
    getMoviesUpComing,
    movieUpComing,
    isLoadingUpComing,
  };
}
