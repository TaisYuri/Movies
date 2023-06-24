import { useCallback, useState } from 'react';
import { GetMoviesProps, IDetailSchema } from './types';
import Constants from 'expo-constants';
import api from 'src/services/api';

export function useGetDetailMovie({ page }: GetMoviesProps): {
  getDetail: (link: string) => void;
  isLoading: boolean;
  value?: IDetailSchema;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<IDetailSchema>();

  const getDetail = useCallback(
    (link: string) => {
      setIsLoading(true);
      api
        .get(
          `${link}?api_key=${Constants?.expoConfig?.extra?.api_key}&language=pt-BR&page=${page}`
        )
        .then(({ data }) => {
          setValue({
            id: data.id,
            title: data.title,
            genres: data.genres,
            releaseDate: data.release_date,
            voteAverage: data.vote_average,
            overview: data.overview,
            runtime: data.runtime,
            production_companies: data.production_companies[0]?.logo_path,
            belongs_to_collection: { id: data?.belongs_to_collection?.id },
            status: data.status,
          });
        })
        .catch((err) => {
          console.error(`ops! ocorreu um erro ${err}`);
          setValue(undefined);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setValue, page]
  );

  return {
    getDetail,
    value,
    isLoading,
  };
}
