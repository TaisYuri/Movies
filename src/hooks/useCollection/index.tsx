import { useCallback, useState } from 'react';
import { ICollectionSchema, collectionItems } from './types';
import {
  dateConvert,
  dateIsValid,
} from 'src/functions/dateConvert/dateConvert';
import { optionsDefault } from 'src/services';
import axios from 'axios';

export function useCollection(): {
  getCollection: (id: string) => void;
  isLoadingCollection: boolean;
  collections?: ICollectionSchema;
  reset: () => void;
} {
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);
  const [collections, setCollections] = useState<ICollectionSchema>();

  const getCollection = useCallback(
    async (id: string) => {
      setIsLoadingCollection(true);
      await axios(optionsDefault({ method: 'GET', url: `/collection/${id}` }))
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
          setIsLoadingCollection(false);
        })
        .catch((err) => {
          setIsLoadingCollection(false);
          console.error(`ops! ocorreu um erro ${err}`);
          setCollections(undefined);
        });
    },
    [setCollections]
  );

  const reset = useCallback(() => {
    setCollections(undefined);
  }, []);

  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    getCollection,
    collections,
    isLoadingCollection,
    reset,
  };
}
