export type RouteParams = {
    user: IMovies[];
  };
  
export  type IMovies = {
    id: string;
    title: string;
    spoken_languages: Array<string>;
    poster_path: string;
    release_date: string;
    tagline: string;
    vote_average: string;
    genres: Array<string>;
    vote_count: string;
  };