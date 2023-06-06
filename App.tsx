import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Routes } from './src/routes';
import { ThemeProvider } from 'styled-components';
import { SafeArea } from './src/components/SafeArea';
import ThemeLight from './src/theme/LightTheme';
import Theme from './src/theme/Theme';
import { useThemeStore } from './src/states/themeState';

export default function App() {
  const { themeLight } = useThemeStore();

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
