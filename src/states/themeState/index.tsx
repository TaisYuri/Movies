import { create } from 'zustand';

interface themeStoreProps {
  themeLight: boolean;
  setData: (themeLight: boolean) => void;
}
export const useThemeStore = create<themeStoreProps>()((set) => ({
  themeLight: false,
  setData: (value: boolean) => {
    set({ themeLight: value });
  },
}));
