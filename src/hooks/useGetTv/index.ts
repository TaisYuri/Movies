import { useCallback, useState } from "react";
import { apiTv } from "src/services/api";
import { IMovies } from "src/screens/Home/types";
import { API_KEY } from "src/env";

export function useGetTv(): {
  getTv: () => void;
  tv: IMovies[];
  isLoadingTv: Boolean;
} {
  const [isLoadingTv, setIsLoadingTv] = useState(false);
  const [tv, setTv] = useState<IMovies[]>([]);

  const getTv = useCallback(() => {
    setIsLoadingTv(true);
    apiTv
      .get(
        `on_the_air?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then(({ data }) => {
        setTv(data.results);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        setTv([]);
      })
      .finally(() => {
        setIsLoadingTv(false);
      });
  }, [setTv]);

  return {
    getTv,
    tv,
    isLoadingTv,
  };
}
