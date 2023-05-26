import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Routes } from './src/routes';
import { ThemeProvider } from 'styled-components';
import Theme from './src/theme/Theme';

export default function App() {
  const theme = Theme;
  return (
    <NavigationContainer>
      <ThemeProvider theme={Theme}>
        <SafeAreaView
          style={{ backgroundColor: Theme.colors.background, height: 10 }}
        />
        <StatusBar style="dark" translucent />
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
}
