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

import { Notification } from 'src/components/Notification';

export function Favorites(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const { favorites, getFavorite, removeFavorite, message } = useFavorite();
  const navigation = useNavigation();
  const theme = useTheme();

  const onToggleSnackBar = (): void => {
    setVisible(!visible);
  };

  useFocusEffect(
    useCallback(() => {
      getFavorite();
    }, [])
  );

  const handleRemoveItem = useCallback(async (item: string) => {
    setIsLoading(true);
    try {
      await removeFavorite(item);
      getFavorite();
      setTimeout(() => {
        setIsLoading(false);
        onToggleSnackBar();
      }, 400);
    } catch (err) {
      setIsLoading(false);
      console.log('error', err);
    }
  }, []);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<FavoriteProps>): JSX.Element => {
    return (
      <ContainerItem
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('details', { id: item?.id, type: 'movie' });
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
          activeOpacity={1}
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
        showsVerticalScrollIndicator={false}
      />
      <Notification
        message={message.status_message}
        setVisible={setVisible}
        visible={visible}
      />
    </Container>
  );
}
