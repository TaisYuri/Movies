/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Searchbar } from 'react-native-paper';

import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { Loading } from 'src/components/Loading';
import { useSearch } from 'src/hooks/useSearch';
import { useDebounce } from 'use-debounce';
import {
  BoxText,
  CenterLottie,
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
import LottieView from 'lottie-react-native';

// https://api.themoviedb.org/3/search/person?query=Jennifer%20Lopez&api_key=&include_adult=false&language=en-US&page=1
// fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)

export function Search(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch] = useDebounce(searchText, 1000);
  const navigation = useNavigation();
  const animation = useRef(null);

  const { handleSearch, isLoading, value, resetData } = useSearch();

  const handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setSearchText(event.nativeEvent.text);
  };

  useEffect(() => {
    if (debouncedSearch.length > 3) {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  const renderContent = useCallback(() => {
    if (isLoading) {
      return <Loading />;
    }

    if (searchText.length < 3) {
      return <View />;
    }
    if (value?.length === 0) {
      return (
        <CenterLottie>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={require('../../assets/empty-state.json')}
          />
          <Info>Não encontrei nenhuma informação</Info>
        </CenterLottie>
      );
    }

    return (
      <Scroll showsVerticalScrollIndicator={false}>
        {Boolean(value?.length) && <Title>Resultados</Title>}
        {value?.map((item) => {
          if (item !== undefined) {
            return (
              <ContentCards
                key={`${item?.id}${Math.random()}`}
                onPress={() => {
                  navigation.navigate('details', { id: item?.id });
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
                    <TextWithoutImg>{item?.title?.slice(0, 1)}</TextWithoutImg>
                  </PosterWithOutImage>
                )}
                <BoxText>
                  <InfoTitle>{item?.title}</InfoTitle>
                  <Info>{item?.release_date}</Info>
                  <ContentGenre>
                    {item?.genre_ids?.map((genre: number) => (
                      <InfoGenres key={genre}>
                        {
                          genresEnum.filter((item) => item?.id === genre)[0]
                            .name
                        }
                      </InfoGenres>
                    ))}
                  </ContentGenre>
                </BoxText>
              </ContentCards>
            );
          }
          return false;
        })}
      </Scroll>
    );
  }, [value, isLoading, searchText]);

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
            setSearchText('');
          }}
        />
        {renderContent()}
      </Container>
    </>
  );
}
