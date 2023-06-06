import { useCallback, useState } from 'react';
import { IDetailSchema } from './types';
import Constants from 'expo-constants';
import { apiBase } from 'src/services/api';

export function useSearch(): {
  handleSearch: (query: string) => void;
  isLoading: boolean;
  value?: any[];
} {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<any[]>();

  const handleSearch = useCallback(
    (query: string) => {
      setIsLoading(true);
      apiBase
        .get(
          `/search/movie?query=${query}&api_key=${Constants?.expoConfig?.extra?.api_key}&include_adult=false&language=pt-BR&page=1`
        )
        .then(({ data }) => {
          console.log(data);
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
    handleSearch,
    value,
    isLoading,
  };
}
