import { dataProps } from 'src/components/ListCards/types';

export interface RouteParams {
  title: string;
  films: dataProps[];
  newMovies?: boolean;
}

export interface IMovies {
  id: string;
  title: string;
  spoken_languages: string[];
  poster_path: string;
  release_date: string;
  tagline: string;
  vote_average: string;
  genres: string[];
  vote_count: string;
}
