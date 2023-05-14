import { useCallback, useState } from 'react';
import { apiBase } from 'src/services/api';
import { ICollectionSchema, collectionItems } from './types';
import Constants from 'expo-constants';
import { dateConvert } from 'src/functions/dateConvert/dateConvert';

export function useCollection(): {
  getCollection: (id: string) => void;
  isLoadingCollection: boolean;
  collections?: ICollectionSchema;
  reset: () => void;
} {
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);
  const [collections, setCollections] = useState<ICollectionSchema>();

  function dateIsValid(date: string): boolean {
    return !Number.isNaN(new Date(date).getTime());
  }

  const getCollection = useCallback(
    (id: string) => {
      setIsLoadingCollection(true);
      apiBase
        .get(
          `/collection/${id}?api_key=${Constants?.expoConfig?.extra?.api_key}&language=pt-BR`
        )
        .then(({ data }) => {
          setCollections({
            id: data.id,
            parts: data.parts.map((item: collectionItems) => {
              if (dateIsValid(item.release_date)) {
                const newFormatDate = dateConvert(
                  item.release_date
                ).formatOnlyYear;
                return {
                  id: item.id,
                  title: item.title,
                  overview: item.overview,
                  poster_path: item.poster_path,
                  release_date: newFormatDate,
                };
              }
              return false;
            }),
          });
        })
        .catch((err) => {
          console.error(`ops! ocorreu um erro ${err}`);
          setCollections(undefined);
        })
        .finally(() => {
          setIsLoadingCollection(false);
        });
    },
    [setCollections]
  );

  const reset = useCallback(() => {
    setCollections(undefined);
  }, []);

  return {
    getCollection,
    collections,
    isLoadingCollection,
    reset,
  };
}
