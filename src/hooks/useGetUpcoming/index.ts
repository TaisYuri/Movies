import { useCallback, useState } from 'react';
import api from 'src/services/api';
import { type IMovies } from 'src/screens/Home/types';
import { format } from 'date-fns';
import { type GetMoviesProps } from '../useGetMovies/types';
import Constants from 'expo-constants';

export function useGetUpcoming({ page }: GetMoviesProps): {
  getMoviesUpComing: (link: string) => void;
  movieUpComing: IMovies[];
  isLoadingUpComing: boolean;
} {
  const [isLoadingUpComing, setIsLoadingUpComing] = useState(false);
  const [movieUpComing, setMovieUpComing] = useState<IMovies[]>([]);

  const getMoviesUpComing = useCallback(
    (link: string) => {
      setIsLoadingUpComing(true);
      api
        .get(
          `${link}?api_key=${Constants?.expoConfig?.extra?.api_key}&language=pt-BR&page=${page}`
        )
        .then(({ data }) => {
          setMovieUpComing(
            data.results
              // FILTRAR TODOS COM DATA SUPERIOR A DATA ATUAL
              // ORDENANDO POR DATA
              .filter(
                (item: IMovies) =>
                  item.release_date > format(new Date(Date.now()), 'yyyy-MM-dd')
              )
              .sort((a: any, b: any) =>
                a.release_date.localeCompare(b.release_date)
              )
          );
        })
        .catch((err) => {
          console.error(`ops! ocorreu um erro ${err}`);
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
