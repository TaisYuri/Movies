// { "media_type": "movie", "media_id": 603692, "favorite": false }
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { FavoriteSchema, FavoriteSendProps, FavoriteProps } from './types';
import { useFavoriteStore } from 'src/states/favoriteState';

export function useFavorite(idMovie?: string): {
  getFavorite: () => void;
  favorites?: FavoriteProps[];
  hasFavorite: boolean;
  handleFavorite: () => void;
  loading: boolean;
  removeFavorite: (idMovie: string) => void;
} {
  const [message, setMessage] = useState<FavoriteSchema>({
    status_code: 0,
    status_message: '',
    success: false,
  });
  const [favorites, setFavorites] = useState<FavoriteProps[]>();
  const [hasFavorite, setHasFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setData, favoriteStore } = useFavoriteStore();

  const id = idMovie ?? '';

  const options = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTZkMTJjMGM0Y2U3OTg4YTNhODQ4NmZjNDg1ZmFkNCIsInN1YiI6IjYyZDQxMWEwMGQxZTdmMDA1M2YwMDY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.alS152KUAgBGLIGsC7nNR9gg_yKtDwRrajNhJOuLtTo',
    },
  };

  useEffect(() => {
    if (favoriteStore.find((item) => item.idFavorite === id) != null) {
      setHasFavorite(true);
    }
  }, []);

  const sendFavorite = useCallback(
    ({ isFavorite, mediaId }: FavoriteSendProps) => {
      setLoading(true);
      axios
        .request({
          method: 'POST',
          url: 'https://api.themoviedb.org/3/account/13286024/favorite',
          data: {
            media_type: 'movie',
            media_id: mediaId,
            favorite: isFavorite,
          },
          ...options,
        })
        .then(function (response) {
          setMessage(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          console.error(error);
        });
    },
    []
  );

  const getFavorite = useCallback(() => {
    setLoading(true);
    axios
      .request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/account/13286024/favorite/movies',
        params: { language: 'pt-BR', page: '1', sort_by: 'created_at.asc' },
        ...options,
      })
      .then(({ data }) => {
        setFavorites(
          data.results.map((item: FavoriteProps) => {
            return {
              id: item.id,
              title: item.title,
              vote_average: item.vote_average,
              release_date: item.release_date,
              poster_path: item.poster_path,
            };
          })
        );
        setData({
          favoriteStore: data.results.map((item: FavoriteProps) => {
            return {
              idFavorite: item.id,
              titleFavorite: item.title,
            };
          }),
        });
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const handleFavorite = () => {
    if (favoriteStore.find((item) => item.idFavorite === id) != null) {
      const index = favoriteStore.findIndex((item) => item.idFavorite === id);
      favoriteStore.splice(index, 1);
      setData({
        favoriteStore,
      });
      sendFavorite({ isFavorite: false, mediaId: Number(id) });

      setHasFavorite(false);
    } else {
      setData({
        favoriteStore: [...favoriteStore, { idFavorite: id }],
      });
      setHasFavorite(true);
      sendFavorite({ isFavorite: true, mediaId: Number(id) });
    }
  };
  const removeFavorite = (idToRemove: string) => {
    if (favoriteStore.find((item) => item.idFavorite === idToRemove) != null) {
      const index = favoriteStore.findIndex(
        (item) => item.idFavorite === idToRemove
      );
      favoriteStore.splice(index, 1);
      setData({
        favoriteStore,
      });
      sendFavorite({ isFavorite: false, mediaId: Number(idToRemove) });
      setHasFavorite(false);
    }
  };

  return {
    getFavorite,
    favorites,
    hasFavorite,
    handleFavorite,
    loading,
    removeFavorite,
  };
}
