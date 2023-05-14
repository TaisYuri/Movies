export interface RouteParams {
  title: string;
  films: IMovies[];
  newMovies?: boolean;
}

export interface IMovies {
  id: string;
  title: string;
  spoken_languages: string[];
  poster_path: string;
  releaseDate: string;
  tagline: string;
  voteAverage: string;
  genres: string[];
  vote_count: string;
}
