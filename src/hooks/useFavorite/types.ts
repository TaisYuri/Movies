export interface FavoriteProps {
  id: string;
  title: string;
  vote_average: string;
  release_date: string;
  poster_path: string;
}

export interface FavoriteSchema {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface FavoriteSendProps {
  isFavorite: boolean;
  mediaId: number;
}
