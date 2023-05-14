import { useCallback, useState } from 'react';
import api from 'src/services/api';
import { type IMovies } from 'src/screens/Home/types';
import { type GetMoviesProps, type TMovie } from './types';
import Constants from 'expo-constants';

export function useGetMovies({ page }: GetMoviesProps): {
  getMovies: (link: TMovie) => void;
  value: IMovies[];
  isLoading: boolean;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<IMovies[]>([]);

  const getMovies = useCallback(
    (link: TMovie) => {
      setIsLoading(true);
      api
        .get(
          `${link}?api_key=${Constants?.expoConfig?.extra?.api_key}&language=pt-BR&page=${page}`
        )
        .then(({ data }) => {
          setValue(data.results);
        })
        .catch((err) => {
          console.error(`ops! ocorreu um erro ${err}`);
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
