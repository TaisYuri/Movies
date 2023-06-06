import React, { useCallback, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { ButtonPrimary } from 'src/components/Buttons/ButtonPrimary';
import { Loading } from 'src/components/Loading';
import { useSearch } from 'src/hooks/useSearch';
import { useDebounce } from 'use-debounce';

// https://api.themoviedb.org/3/search/person?query=Jennifer%20Lopez&api_key=856d12c0c4ce7988a3a8486fc485fad4&include_adult=false&language=en-US&page=1
// fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)

export function Search(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedSearch] = useDebounce(searchText, 700);

  const { handleSearch, isLoading, value } = useSearch();

  const search = useCallback(() => {
    handleSearch(searchText);
  }, []);

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
    <View>
      <Text>Search</Text>
      <TextInput
        value={searchText}
        onChange={handleChange}
        placeholder="digite"
        style={{ backgroundColor: 'gray' }}
      />

      <ButtonPrimary onPress={search}>Buscar</ButtonPrimary>
      <Text>{searchText}</Text>
      {value?.map((item) => (
        <View key={item?.id} style={{}}>
          <Text>{item?.original_title}</Text>
        </View>
      ))}
    </View>
  );
}
