import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Switch } from 'react-native';
import { useThemeStore } from 'src/states/themeState';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import {
  Container,
  ContentSwitch,
  Diviser,
  ItemMenu,
  ItemText,
  NavMenu,
} from './styles';
import { Header } from 'src/components/Header';
export function Profile(): JSX.Element {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { setData, themeLight } = useThemeStore();
  const navigation = useNavigation();
  const theme = useTheme();

  const handleButton = (): void => {
    setData(!themeLight);
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <Header title="Conta" />
      <Container>
        <ContentSwitch>
          <Feather name="sun" size={24} color={theme.colors.base} />
          <Switch onValueChange={handleButton} value={isDarkTheme} />
          <Feather name="moon" size={24} color={theme.colors.base} />
        </ContentSwitch>
        <NavMenu>
          <Diviser />
          <ItemMenu
            onPress={() => {
              navigation.navigate('favorites');
            }}
          >
            <MaterialIcons
              name="favorite"
              size={24}
              color={theme.colors.base}
            />
            <ItemText>Favoritos</ItemText>
          </ItemMenu>
          <Diviser />
          <ItemMenu>
            <MaterialIcons
              name="bookmark"
              size={24}
              color={theme.colors.base}
            />
            <ItemText>Assistir mais tarde (em desenvolvimento)</ItemText>
          </ItemMenu>
          <Diviser />
          <ItemMenu>
            <MaterialIcons name="person" size={24} color={theme.colors.base} />
            <ItemText>Conta (em desenvolvimento)</ItemText>
          </ItemMenu>
          <Diviser />
        </NavMenu>
      </Container>
    </>
  );
}
