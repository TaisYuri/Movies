export type RouteParams = {
    id: string;
  };
  
  export interface IProvider {
    logo_path: string;
    provider_id: string;
    provider_name: string;
    display_priority: string;
  }
  export interface IProductionCompany {
    logo_path: string;
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