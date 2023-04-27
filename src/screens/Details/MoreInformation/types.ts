export type RouteParams = {
    id: string;
  };
  
 
  export interface IMovieDetails {
    id: string;
    original_title: string;
    title: string;
    original_language: string;
    spoken_languages: any;
    backdrop_path: string;
    release_date: string;
    tagline: string;
    vote_average: string;
    genres: any;
    vote_count: string;
    overview: string;
    runtime: string;
  }
  
  export interface IImage{
    file_path: string;
  }