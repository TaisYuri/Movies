export type TMovie = 'popular' | 'now_playing' | 'top_rated' | string;

export interface GetMoviesProps {
  page?: string;
}
