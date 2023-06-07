export interface RouteParams {
  user: IMovies[];
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
