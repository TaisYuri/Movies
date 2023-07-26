import { IGenres } from 'src/screens/Details/BasicInformation/types';

export interface IDetailTvSchema {
  id: string;
  title: string;
  genres: IGenres[];
  releaseDate: string;
  in_production: boolean;
  overview: string;
  number_of_seasons: string;
  poster_path: string;
  voteAverage: string;
  networks: {
    logo_path: string;
  };

  seasons: SeasonsProps[];
  production_companies?: string;
  runtime?: string;
}

export interface SeasonsProps {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  poster_path: string;
  season_number: number;
}
