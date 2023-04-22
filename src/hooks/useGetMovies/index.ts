import { useCallback, useState } from "react";
import api from "../../../services/api";
import { IMovies } from "../../screens/Home/types";
import { GetMoviesProps, TMovie } from "./types";

export function useGetMovies({ page }: GetMoviesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<IMovies[]>([]);

  const getMovies = useCallback(
    (link: TMovie) => {
      setIsLoading(true);
      api
        .get(
          `${link}?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=pt-BR&page=${page}`
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
