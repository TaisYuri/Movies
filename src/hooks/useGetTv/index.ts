import { useCallback, useState } from 'react';
import { IMovies } from 'src/screens/Home/types';
import { optionsDefault } from 'src/services';
import axios from 'axios';
import { GetTvProps } from './types';

export function useGetTv(): {
  getTv: ({ type }: GetTvProps) => void;
  tv: IMovies[];
  isLoadingTv: boolean;
} {
  const [isLoadingTv, setIsLoadingTv] = useState(false);
  const [tv, setTv] = useState<IMovies[]>([]);

  const getTv = useCallback(
    ({ type }: GetTvProps) => {
      setIsLoadingTv(true);
      axios(optionsDefault({ method: 'GET', url: `/tv/${type}` }))
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
    },
    [setTv]
  );

  return {
    getTv,
    tv,
    isLoadingTv,
  };
}
