import { useCallback, useState } from 'react';
import { ISearchMovies } from './types';
import {
  dateConvert,
  dateIsValid,
} from 'src/functions/dateConvert/dateConvert';
import { optionsDefault } from 'src/services';
import axios from 'axios';

export function useSearch(): {
  handleSearch: (query: string) => Promise<void>;
  isLoading: boolean;
  value?: ISearchMovies[];
  resetData: () => void;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<ISearchMovies[]>();

  const handleSearch = useCallback(
    async (query: string) => {
      setIsLoading(true);
      setValue([]);
      await axios(
        optionsDefault({ method: 'GET', url: `/search/movie?query=${query}` })
      )
        .then(({ data }) => {
          setValue(
            // eslint-disable-next-line array-callback-return
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
            })
          );
          setIsLoading(false);
        })
        .catch((err: Error) => {
          setIsLoading(false);
          console.error(`ops! ocorreu um erro ${err.message}`);
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
