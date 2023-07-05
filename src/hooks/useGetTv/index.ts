import { useCallback, useState } from 'react';
import { IMovies } from 'src/screens/Home/types';
import { optionsDefault } from 'src/services';
import axios from 'axios';

export function useGetTv(): {
  getTv: () => void;
  tv: IMovies[];
  isLoadingTv: boolean;
} {
  const [isLoadingTv, setIsLoadingTv] = useState(false);
  const [tv, setTv] = useState<IMovies[]>([]);

  const getTv = useCallback(() => {
    setIsLoadingTv(true);
    axios(optionsDefault({ method: 'GET', url: `/tv/on_the_air` }))
      .then(({ data }) => {
        setTv(data.results);
      })
      .catch((err) => {
        console.error(`ops! ocorreu um erro ${err}`);
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
