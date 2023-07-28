import { typeDetailProps } from 'src/hooks/useHandleTypeDetails/types';

export interface RouteParams {
  id: string;
  type: typeDetailProps;
}

export interface IProvider {
  logoPath: string;
  provider_id: string;
  provider_name: string;
  display_priority: string;
}
export interface IProductionCompany {
  logoPath: string;
  id: string;
  name: string;
  origin_country: string;
}

export interface IMovieDetails {
  id: string;
  original_title: string;
  title: string;
  original_language: string;
  spoken_languages: any;
  backdrop_path: string;
  releaseDate: string;
  tagline: string;
  voteAverage: string;
  genres: any;
  vote_count: string;
  overview: string;
  runtime: string;
}

export interface IImage {
  file_path: string;
}
