import React from 'react';
import { List } from 'react-native-paper';
import { SubTitleProvider } from './styles';
import { ISeasons } from './types';
import { Content, Poster } from 'src/screens/Favorites/styles';
import { BoxText, Info } from 'src/components/CardsCollection/styles';
import { InfoTitle } from 'src/screens/Search/styles';
import { dateConvert } from 'src/functions/dateConvert/dateConvert';
import { useTheme } from 'styled-components/native';

export function Seasons({ seasons }: ISeasons): JSX.Element {
  const lastSeason = seasons.slice(-1)[0];
  const theme = useTheme();

  return (
    <>
      <SubTitleProvider>Ultima temporada exibida</SubTitleProvider>

      <Content>
        <Poster
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${lastSeason?.poster_path}`,
          }}
          resizeMode="contain"
        />
        <BoxText>
          <InfoTitle>{lastSeason?.name}</InfoTitle>
          <Info>{dateConvert(lastSeason?.air_date).formatOnlyYear}</Info>
          <Info>{lastSeason?.episode_count} episódios</Info>
        </BoxText>
      </Content>

      <List.Section>
        <List.Accordion
          title="Mostrar todas as temporadas"
          style={{ backgroundColor: theme.colors.background }}
          titleStyle={{
            color: theme.colors.base,
            textDecorationLine: 'underline',
            fontFamily: theme.fonts.bold,
          }}
        >
          {seasons.map((item) => {
            return (
              <List.Item
                key={item.id}
                title={item.name}
                description={`${dateConvert(item?.air_date).formatOnlyYear} - ${
                  item.episode_count
                } episódios`}
                titleStyle={{
                  color: theme.colors.base,
                  fontFamily: theme.fonts.bold,
                }}
                descriptionStyle={{
                  color: theme.colors.base,
                  fontFamily: theme.fonts.regular,
                }}
              />
            );
          })}
        </List.Accordion>
      </List.Section>
    </>
  );
}
