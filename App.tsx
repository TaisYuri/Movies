import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';
import { ThemeProvider } from 'styled-components';
import { SafeArea } from './src/components/SafeArea';
import { useThemeStore } from './src/states/themeState';
import { useLoadFonts } from './src/hooks/useLoadFonts';
import Theme from './src/theme/Theme';
import ThemeLight from './src/theme/LightTheme';

export default function App() {
  const { themeLight } = useThemeStore();

  const { fontsLoaded, onLayoutRootView } = useLoadFonts();

  useEffect(() => {
    onLayoutRootView();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={themeLight ? ThemeLight : Theme}>
        <SafeArea />
        <StatusBar style="dark" translucent />
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
}
