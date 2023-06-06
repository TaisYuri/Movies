import { IGenres } from 'src/screens/Details/BasicInformation/types';

export type TMovie = 'popular' | 'now_playing' | 'top_rated' | string;

export interface GetMoviesProps {
  page?: string;
}

export interface IDetailSchema {
  id: string;
  runtime: string;
  title: string;
  voteAverage: string;
  releaseDate: string;
  genres: IGenres[];
  overview: string;
  production_companies: string;
  belongs_to_collection: {
    id: string;
  };
}
