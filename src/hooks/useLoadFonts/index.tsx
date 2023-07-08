import { useCallback } from 'react';
import {
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const useLoadFonts = (): {
  fontsLoaded: boolean;
  onLayoutRootView: () => Promise<void>;
} => {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    } finally {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return {
    fontsLoaded,
    onLayoutRootView,
  };
};
