import { SeasonsProps } from 'src/hooks/useGetDetailTv/types';

export interface ISeasons {
  seasons: SeasonsProps[];
  tvId?: string;
}

export interface IGenres {
  id: string;
  name: string;
}
