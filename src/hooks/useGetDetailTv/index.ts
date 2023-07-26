import { useCallback, useState } from 'react';
import { IDetailTvSchema, SeasonsProps } from './types';
import { optionsDefault } from 'src/services';
import axios from 'axios';

export function useGetDetailTv(): {
  getDetailTv: (id: string) => void;
  isLoading: boolean;
  valueTv?: IDetailTvSchema;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [valueTv, setValueTv] = useState<IDetailTvSchema>();

  const getDetailTv = useCallback(
    (id: string) => {
      setIsLoading(true);
      axios(optionsDefault({ method: 'GET', url: `/tv/${id}` }))
        .then(({ data }) => {
          setValueTv({
            id: data.id,
            title: data.name,
            genres: data.genres,
            releaseDate: data.first_air_date,
            voteAverage: data.vote_average,
            overview: data.overview,
            number_of_seasons: data.number_of_seasons,
            poster_path: data.poster_path,
            networks: data.networks[0]?.logo_path,
            in_production: data.in_production,

            seasons: data?.seasons?.map((item: SeasonsProps) => {
              return {
                air_date: item.air_date,
                episode_count: item.episode_count,
                id: item.id,
                name: item.name,
                poster_path: item.poster_path,
                season_number: item.season_number,
              };
            }),
          });
        })
        .catch((err) => {
          console.error(`ops! ocorreu um erro ${err}`);
          setValueTv(undefined);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setValueTv]
  );

  return {
    getDetailTv,
    valueTv,
    isLoading,
  };
}
