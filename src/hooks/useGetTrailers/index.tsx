import { useCallback, useState } from 'react';
import { TrailersItems } from './types';
import { optionsDefault } from 'src/services';
import axios from 'axios';

export function useGetTrailers(): {
  getTrailers: (id: string) => void;
  isLoading: boolean;
  value?: TrailersItems[];
} {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<TrailersItems[]>();

  const getTrailers = useCallback(
    (id: string) => {
      setIsLoading(true);
      axios(optionsDefault({ method: 'GET', url: `/movie/${id}/videos` }))
        .then(({ data }) => {
          setValue(data.results);
        })
        .catch((err) => {
          console.error(`ops! ocorreu um erro ${err}`);
          setValue(undefined);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setValue]
  );

  return {
    getTrailers,
    value,
    isLoading,
  };
}
