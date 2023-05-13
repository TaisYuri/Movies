import { useCallback, useState } from 'react';
import { type PersonsSchema } from './types';
import api from 'src/services/api';
import Constants from 'expo-constants';

export function usePersonForMovie(): {
  getPersons: (link: string) => void;
  isLoadingPerson: boolean;
  PersonsOfMovies: PersonsSchema;
} {
  const [isLoadingPerson, setIsLoadingPerson] = useState(false);
  const [PersonsOfMovies, setPersonsOfMovies] = useState<PersonsSchema>();

  const getPersons = useCallback(
    (id: string) => {
      setIsLoadingPerson(true);
      api
        .get(`${id}?api_key=${Constants?.expoConfig?.extra?.api_key}`)
        .then(({ data }) => {
          const director = data?.crew
            ?.filter((item) => item.job === 'Director')
            ?.map((name) => {
              return { id: name?.credit_id, name: name?.original_name };
            });
          setPersonsOfMovies({
            director,
            persons: data.cast.slice(0, 10).map((person) => {
              return {
                id: person.id,
                name: person.name,
                profilePath: person.profilePath,
                character: person.character,
              };
            }),
          });
        })
        .catch((err) => {
          console.error('ops! ocorreu um erro' + err);
          setPersonsOfMovies({} as PersonsSchema);
        })
        .finally(() => {
          setIsLoadingPerson(false);
        });
    },
    [PersonsOfMovies]
  );

  return {
    getPersons,
    PersonsOfMovies,
    isLoadingPerson,
  };
}
