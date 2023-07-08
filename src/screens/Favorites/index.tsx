import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useFavorite } from 'src/hooks/useFavorite';
import { Header } from 'src/components/Header';
import { ListRenderItemInfo, ActivityIndicator } from 'react-native';
import { FavoriteProps } from 'src/hooks/useFavorite/types';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useTheme } from 'styled-components';
import {
  ButtonRight,
  Container,
  ContainerItem,
  Content,
  ContentHidden,
  ContentHiddenLoading,
  Poster,
  Space,
} from './styles';
import { BoxText, Info, InfoTitle } from '../Search/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function Favorites(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { favorites, getFavorite, removeFavorite } = useFavorite();
  const navigation = useNavigation();
  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      getFavorite();
    }, [])
  );

  const handleRemoveItem = useCallback(async (item: string) => {
    try {
      setIsLoading(true);
      await removeFavorite(item);
      getFavorite();
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    } catch (err) {
      console.log('aaaa', err);
    }
  }, []);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<FavoriteProps>): JSX.Element => {
    return (
      <ContainerItem
        onPress={() => {
          navigation.navigate('details', { id: item?.id });
        }}
      >
        <Content>
          <Poster
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item?.poster_path}`,
            }}
            resizeMode="contain"
          />
          <BoxText>
            <InfoTitle>{item?.title}</InfoTitle>
            <Info>{item?.release_date}</Info>
          </BoxText>
        </Content>
      </ContainerItem>
    );
  };

  const renderHiddenItem = (
    data: ListRenderItemInfo<FavoriteProps>
  ): JSX.Element => {
    return isLoading ? (
      <ContentHiddenLoading>
        <ActivityIndicator size={24} color={theme.colors.base} />
      </ContentHiddenLoading>
    ) : (
      <ContentHidden>
        <ButtonRight
          onPress={() => {
            void handleRemoveItem(data.item.id);
          }}
          disabled={isLoading}
        >
          <MaterialCommunityIcons
            name="delete"
            color={theme.colors.base}
            size={20}
          />
        </ButtonRight>
      </ContentHidden>
    );
  };

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <Container>
      <Header title="Favoritos" />
      <Space />
      <SwipeListView
        data={favorites}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-80}
      />
    </Container>
  );
}
