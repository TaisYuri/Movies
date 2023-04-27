import { useCallback, useState } from "react";
import api from "src/services/api";
import { IMovies } from "src/screens/Home/types";
import { GetMoviesProps, TMovie } from "./types";
import { API_KEY, LANGUAGE } from "src/env";

export function useGetMovies({ page }: GetMoviesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<IMovies[]>([]);

  const getMovies = useCallback(
    (link: TMovie) => {
      setIsLoading(true);
      api
        .get(
          `${link}?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`
        )
        .then(({ data }) => {
          setValue(data.results);
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
          setValue([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setValue, page]
  );

  return {
    getMovies,
    value,
    isLoading,
  };
}
