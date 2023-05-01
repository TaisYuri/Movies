import { useCallback, useState } from "react";
import api from "src/services/api";
import { IMovies } from "src/screens/Home/types";
import { GetMoviesProps, TMovie } from "./types";
import Constants from "expo-constants";

export function useGetMovies({ page }: GetMoviesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<IMovies[]>([]);

  const getMovies = useCallback(
    async (link: TMovie) => {
      setIsLoading(true);
      await api
      .get(
        `${link}?api_key=${Constants?.expoConfig?.extra?.api_key}&language=pt-BR&page=${page}`
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
