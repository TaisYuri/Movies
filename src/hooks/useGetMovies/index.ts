import { useCallback, useState } from 'react';
import { type IMovies } from 'src/screens/Home/types';
import { type GetMoviesProps, type TMovie } from './types';
import { optionsDefault } from 'src/services';
import axios from 'axios';
import { typeDetailProps } from '../useHandleTypeDetails/types';

export function useGetMovies({ page }: GetMoviesProps): {
  getMovies: (link: TMovie, type: typeDetailProps) => void;
  value: IMovies[];
  isLoading: boolean;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<IMovies[]>([]);

  const getMovies = useCallback(
    (link: TMovie, type: typeDetailProps) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const typeLink = String(type);
      setIsLoading(true);
      axios(optionsDefault({ method: 'GET', url: `/${typeLink}${link}` }))
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
