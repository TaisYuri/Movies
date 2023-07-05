import { useCallback, useState } from 'react';
import { type PersonsSchema } from './types';
import { optionsDefault } from 'src/services';
import axios from 'axios';

export function usePersonForMovie(): {
  getPersons: (link: string) => void;
  isLoadingPerson: boolean;
  PersonsOfMovies?: PersonsSchema;
} {
  const [isLoadingPerson, setIsLoadingPerson] = useState(false);
  const [PersonsOfMovies, setPersonsOfMovies] = useState<PersonsSchema>();

  const getPersons = useCallback(
    (id: string) => {
      setIsLoadingPerson(true);
      axios(optionsDefault({ method: 'GET', url: `/movie${id}` }))
        .then(({ data }) => {
          const director = data?.crew
            ?.filter((item: any) => item.job === 'Director')
            ?.map((name: any) => {
              return {
                id: name?.credit_id,
                name: name?.original_name,
                profilePath: name?.profile_path,
              };
            });
          setPersonsOfMovies({
            director,
            persons: data.cast.slice(0, 10).map((person: any) => {
              return {
                id: person.id,
                name: person.name,
                profilePath: person.profile_path,
                character: person.character,
              };
            }),
          });
        })
        .catch((err) => {
          console.error(`ops! ocorreu um erro ${err}`);
          setPersonsOfMovies(undefined);
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
