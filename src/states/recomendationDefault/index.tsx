/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IMovies } from 'src/screens/Home/types';
import { create } from 'zustand';

const initialState = {
  recommendationStore: [],
};

interface TSetRecommendation {
  setData: (value: Partial<TRecommendation>) => void;
}

export interface TRecommendation extends TSetRecommendation {
  recommendationStore: IMovies[];
}

const useStore = create<TRecommendation>()((set) => ({
  ...initialState,
  setData: (value: Partial<TRecommendation>) => {
    set((state) => {
      return { ...state, ...value };
    });
  },
}));

export const useRecommendationStore = () => {
  const { recommendationStore, setData } = useStore();
  return { recommendationStore, setData };
};
