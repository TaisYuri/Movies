import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Routes } from './src/routes';
import { ThemeProvider } from 'styled-components';
import { SafeArea } from './src/components/SafeArea';
import ThemeLight from './src/theme/LightTheme';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={ThemeLight}>
        <SafeArea />
        <StatusBar style="dark" translucent />
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
}
