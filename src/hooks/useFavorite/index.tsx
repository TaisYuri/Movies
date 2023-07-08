import { useCallback, useEffect, useState } from 'react';
import { FavoriteSchema, FavoriteSendProps, FavoriteProps } from './types';
import { useFavoriteStore } from 'src/states/favoriteState';
import { optionsDefault } from 'src/services';
import axios from 'axios';
import {
  dateConvert,
  dateIsValid,
} from 'src/functions/dateConvert/dateConvert';

export function useFavorite(idMovie?: string): {
  getFavorite: () => void;
  favorites: FavoriteProps[];
  hasFavorite: boolean;
  handleFavorite: () => Promise<void>;
  loading: boolean;
  removeFavorite: (idMovie: string) => Promise<void>;
} {
  const [message, setMessage] = useState<FavoriteSchema>({
    status_code: 0,
    status_message: '',
    success: false,
  });
  const [favorites, setFavorites] = useState<FavoriteProps[]>([]);
  const [hasFavorite, setHasFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setData, favoriteStore } = useFavoriteStore();

  const id = idMovie ?? '';

  useEffect(() => {
    if (favoriteStore.find((item) => item.idFavorite === id) != null) {
      setHasFavorite(true);
    }
  }, []);

  const sendFavorite = useCallback(
    async ({ isFavorite, mediaId }: FavoriteSendProps) => {
      setLoading(true);
      await axios(
        optionsDefault({
          method: 'POST',
          url: `/account/13286024/favorite`,
          data: {
            media_type: 'movie',
            media_id: mediaId,
            favorite: isFavorite,
          },
        })
      )
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
    axios(
      optionsDefault({
        method: 'GET',
        url: `/account/13286024/favorite/movies`,
      })
    )
      .then(({ data }) => {
        setFavorites(
          data.results.map((item: FavoriteProps) => {
            if (dateIsValid(item?.release_date)) {
              const newFormatDate = dateConvert(
                item.release_date
              ).formatOnlyYear;
              return {
                id: item.id,
                title: item.title,
                vote_average: item.vote_average,
                release_date: newFormatDate,
                poster_path: item.poster_path,
              };
            }
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

  const handleFavorite = async (): Promise<void> => {
    if (favoriteStore.find((item) => item.idFavorite === id) != null) {
      const index = favoriteStore.findIndex((item) => item.idFavorite === id);
      favoriteStore.splice(index, 1);
      setData({
        favoriteStore,
      });
      await sendFavorite({ isFavorite: false, mediaId: Number(id) });

      setHasFavorite(false);
    } else {
      setData({
        favoriteStore: [...favoriteStore, { idFavorite: id }],
      });
      setHasFavorite(true);
      await sendFavorite({ isFavorite: true, mediaId: Number(id) });
    }
  };
  const removeFavorite = async (idToRemove: string): Promise<void> => {
    if (favoriteStore.find((item) => item.idFavorite === idToRemove) != null) {
      setLoading(true);
      const index = favoriteStore.findIndex(
        (item) => item.idFavorite === idToRemove
      );
      favoriteStore.splice(index, 1);
      setData({
        favoriteStore,
      });
      await sendFavorite({ isFavorite: false, mediaId: Number(idToRemove) });
      setHasFavorite(false);
      setLoading(false);
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
