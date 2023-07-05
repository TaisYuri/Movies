import { useCallback, useState } from 'react';
import { type IMovies } from 'src/screens/Home/types';
import { format } from 'date-fns';
import { type GetMoviesProps } from '../useGetMovies/types';
import { optionsDefault } from 'src/services';
import axios from 'axios';

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
      axios(optionsDefault({ method: 'GET', url: `/movie/${link}` }))
        .then(({ data }) => {
          setMovieUpComing(
            data.results
              // FILTRAR TODOS COM DATA SUPERIOR A DATA ATUAL
              // ORDENANDO POR DATA
              .filter(
                (item: IMovies) =>
                  item.release_date > format(new Date(Date.now()), 'dd-MM-yyyy')
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
