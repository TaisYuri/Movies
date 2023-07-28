import { DataProps } from 'src/components/ListCards/types';
import { typeDetailProps } from 'src/hooks/useHandleTypeDetails/types';

export interface RouteParams {
  title: string;
  films: DataProps[];
  newMovies?: boolean;
  type: typeDetailProps;
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
