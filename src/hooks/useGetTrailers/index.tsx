import { useCallback, useState } from 'react';
import { TrailersItems } from './types';
import Constants from 'expo-constants';
import api from 'src/services/api';

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
      api
        .get(
          `/${id}/videos?api_key=${Constants?.expoConfig?.extra?.api_key}&language=pt-BR`
        )
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
