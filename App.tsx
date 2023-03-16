import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Routes } from './src/routes';
import {ThemeProvider } from 'styled-components';
import { theme } from './src/theme/styles';

export default function App() {
  return (
    <NavigationContainer >
      <ThemeProvider theme={theme}>

      <SafeAreaView style={{ backgroundColor:'#1f222a', height:10 }} />
      <StatusBar style='dark' translucent />
      <Routes/>
      </ThemeProvider>
    </NavigationContainer>
  );
}

