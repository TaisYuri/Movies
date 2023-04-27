import { useCallback, useState } from "react";
import { apiTv } from "src/services/api";
import { IMovies } from "src/screens/Home/types";
import Constants from "expo-constants";

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
        `on_the_air?api_key=${Constants?.expoConfig?.extra?.api_key}&language=en-US&page=1`
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
