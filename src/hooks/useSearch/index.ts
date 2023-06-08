import { useCallback, useState } from 'react';
import Constants from 'expo-constants';
import { apiBase } from 'src/services/api';
import { ISearchMovies } from './types';
import {
  dateConvert,
  dateIsValid,
} from 'src/functions/dateConvert/dateConvert';

export function useSearch(): {
  handleSearch: (query: string) => void;
  isLoading: boolean;
  value?: ISearchMovies[];
  resetData: () => void;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<ISearchMovies[]>();

  const handleSearch = useCallback(
    (query: string) => {
      setIsLoading(true);
      setValue([]);
      apiBase
        .get(
          `/search/movie?query=${query}&api_key=${Constants?.expoConfig?.extra?.api_key}&include_adult=false&language=pt-BR&page=1`
        )
        .then(({ data }) => {
          setValue(
            data.results.map((item: ISearchMovies) => {
              if (dateIsValid(item?.release_date)) {
                const newFormatDate = dateConvert(
                  item.release_date
                ).formatOnlyYear;

                return {
                  id: item.id,
                  poster_path: item.poster_path,
                  title: item.title,
                  release_date: newFormatDate,
                  genre_ids: item.genre_ids,
                };
              }
              return false;
            })
          );

          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(`ops! ocorreu um erro ${err}`);
          setValue(undefined);
        });
    },
    [setValue]
  );

  const resetData = useCallback(() => {
    setIsLoading(false);
    setValue([]);
  }, []);

  return {
    handleSearch,
    value,
    isLoading,
    resetData,
  };
}
