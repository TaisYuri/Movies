/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { create } from 'zustand';

const initialState = {
  favoriteStore: [],
};

export interface TFavoritesItem {
  idFavorite: string;
}

interface TSetFavorite {
  setData: (value: Partial<TFavorites>) => void;
}

export interface TFavorites extends TSetFavorite {
  favoriteStore: TFavoritesItem[];
}

const useStore = create<TFavorites>()((set) => ({
  ...initialState,
  setData: (value: Partial<TFavorites>) => {
    set((state) => {
      return { ...state, ...value };
    });
  },
}));

export const useFavoriteStore = () => {
  const { favoriteStore, setData } = useStore();
  return { favoriteStore, setData };
};
