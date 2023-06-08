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
  Info,
  Poster,
  Scroll,
} from './styles';
import { Header } from 'src/components/Header';
import { useNavigation } from '@react-navigation/native';
import { Title } from 'src/components/Title';

// https://api.themoviedb.org/3/search/person?query=Jennifer%20Lopez&api_key=856d12c0c4ce7988a3a8486fc485fad4&include_adult=false&language=en-US&page=1
// fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)

export function Search(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch] = useDebounce(searchText, 700);
  const navigation = useNavigation();

  const { handleSearch, isLoading, value } = useSearch();

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

  if (isLoading) {
    <Loading />;
  }

  return (
    <>
      <Header title="Busca" />
      <Container>
        <Searchbar
          value={searchText}
          onChange={handleChange}
          placeholder="Pesquise por filme, serie ou atores"
        />
        <Scroll>
          <Title>Resultados</Title>
          {value?.map((item) => {
            return (
              <ContentCards
                key={item?.id}
                onPress={() => {
                  navigation.navigate('details', { id: item.id });
                }}
              >
                {item?.poster_path !== undefined &&
                  item?.poster_path !== null && (
                    <Poster
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500/${item?.poster_path}`,
                      }}
                      resizeMode="contain"
                    />
                  )}
                <BoxText>
                  <Info style={{ fontWeight: 'bold' }}>{item?.title}</Info>
                  <Info>{item?.release_date}</Info>
                </BoxText>
              </ContentCards>
            );
          })}
        </Scroll>
      </Container>
    </>
  );
}
