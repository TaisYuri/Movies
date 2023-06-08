import React, { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';

import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Loading } from 'src/components/Loading';
import { useSearch } from 'src/hooks/useSearch';
import { useDebounce } from 'use-debounce';
import {
  BoxText,
  Container,
  ContentCards,
  ContentGenre,
  Info,
  InfoGenres,
  InfoTitle,
  Poster,
  PosterWithOutImage,
  Scroll,
} from './styles';
import { Header } from 'src/components/Header';
import { useNavigation } from '@react-navigation/native';
import { Title } from 'src/components/Title';
import { genresEnum } from 'src/datas/genres';
import { TextWithoutImg } from 'src/components/Card/styles';

// https://api.themoviedb.org/3/search/person?query=Jennifer%20Lopez&api_key=&include_adult=false&language=en-US&page=1
// fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)

export function Search(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch] = useDebounce(searchText, 700);
  const navigation = useNavigation();

  const { handleSearch, isLoading, value, resetData } = useSearch();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setSearchText(event.nativeEvent.text);
  };

  useEffect(() => {
    if (debouncedSearch.length > 3) {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <>
      <Header title="Buscar" />
      <Container>
        <Searchbar
          value={searchText}
          onChange={handleChange}
          placeholder="Pesquise por filme, serie ou atores"
          onClearIconPress={() => {
            resetData();
          }}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <Scroll showsVerticalScrollIndicator={false}>
            {Boolean(value?.length) && <Title>Resultados</Title>}
            {value?.map((item) => {
              return (
                <ContentCards
                  key={item?.id}
                  onPress={() => {
                    navigation.navigate('details', { id: item.id });
                  }}
                >
                  {item?.poster_path !== undefined &&
                  item?.poster_path !== null ? (
                    <Poster
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500/${item?.poster_path}`,
                      }}
                      resizeMode="contain"
                    />
                  ) : (
                    <PosterWithOutImage>
                      <TextWithoutImg>
                        {item?.title?.slice(0, 1)}
                      </TextWithoutImg>
                    </PosterWithOutImage>
                  )}
                  <BoxText>
                    <InfoTitle>{item?.title}</InfoTitle>
                    <Info>{item?.release_date}</Info>
                    <ContentGenre>
                      {item?.genre_ids?.map((genre: number) => (
                        <InfoGenres key={genre}>
                          {
                            genresEnum.filter((item) => item.id === genre)[0]
                              .name
                          }
                        </InfoGenres>
                      ))}
                    </ContentGenre>
                  </BoxText>
                </ContentCards>
              );
            })}
          </Scroll>
        )}
      </Container>
    </>
  );
}
