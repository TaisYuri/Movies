import { useCallback, useState } from "react";
import { apiTv } from "../../../services/api";
import { IMovies } from "../../screens/Home/types";

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
        "on_the_air?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US&page=1"
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
