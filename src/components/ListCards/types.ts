import { typeDetailProps } from 'src/hooks/useHandleTypeDetails/types';

export interface DataProps {
  id: string;
  title: string;
  vote_average: string;
  release_date: string;
  poster_path: string;
}

export interface IListCards {
  title: string;
  dataMovies: DataProps[];
  newMovies?: boolean;
  textLink?: string;
  hasFavorite?: boolean;
  type: typeDetailProps;
}
