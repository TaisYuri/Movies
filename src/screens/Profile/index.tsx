import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { ButtonPrimary } from 'src/components/Buttons/ButtonPrimary';
import { Card } from 'src/components/Card';
import { ListCards } from 'src/components/ListCards';
import { dataProps } from 'src/components/ListCards/types';
import { useFavorite } from 'src/hooks/useFavorite';
import { useThemeStore } from 'src/states/themeState';
import { BoxCard } from '../Home/styles';

export function Profile(): JSX.Element {
  // const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { favorites, getFavorite } = useFavorite();
  const { setData, themeLight } = useThemeStore();

  const handleButton = () => {
    setData(!themeLight);
  };

  useFocusEffect(
    useCallback(() => {
      getFavorite();
    }, [])
  );

  const renderItem: ListRenderItem<dataProps> = ({ item }) => (
    <BoxCard>
      <Card
        title={item.title}
        vote={String(item.vote_average)}
        uri={item.poster_path}
        hasFavorite
      />
    </BoxCard>
  );

  return (
    <View style={{ flex: 1, display: 'flex' }}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.2, 1]}
        colors={['#5ca896', '#1E1E1E', '#995163']}
        // style={{ flex: 1 }}
      >
        <Text>Profile</Text>
        <ButtonPrimary hasIcon={false} onPress={handleButton}>
          Trocar Tema
        </ButtonPrimary>

        <Text>Retornooooo</Text>
        {/* <ListCards dataMovies={favorites} title='' /> */}

        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </LinearGradient>
    </View>
  );
}
