export interface dataProps {
  id: string;
  title: string;
  vote_average: string;
  release_date: string;
  poster_path: string;
}

export interface IListCards {
  title: string;
  dataMovies: dataProps[];
  newMovies?: boolean;
  textLink?: string;
  hasFavorite?: boolean;
}
