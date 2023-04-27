import { useCallback, useState } from "react";
import { PersonsSchema } from "./types";
import api from "src/services/api";
import { API_KEY } from "src/env";


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
        .get(`${id}?api_key=${API_KEY}`)
        .then(({ data }) => {
          const director = data?.crew?.filter((item) => item.job === "Director")?.map( name => {
            return({id: name?.credit_id, name: name?.original_name})
          });
          setPersonsOfMovies({ 
            director: director, 
            persons: data.cast.slice(0,10).map( person => {
              return({
                id: person.id,
                name: person.name,
                profile_path: person.profile_path,
                character: person.character
              })
            })
          })
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
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
