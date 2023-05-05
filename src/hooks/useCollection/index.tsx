import { useCallback, useState } from "react";
import { apiBase } from "src/services/api";
import { ICollectionSchema } from "./types";
import Constants from "expo-constants";

export function useCollection(): {
  getCollection: (id: string) => void;
  isLoadingCollection: boolean;
  collections: ICollectionSchema;
} {
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);
  const [collections, setCollections] = useState<ICollectionSchema>();

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
            parts: data.parts.map((item) => {
              return {
                id: item.id,
                title: item.title,
                overview: item.overview,
                poster_path: item.poster_path,
                release_date: item.release_date,
              };
            }),
          });
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
          setCollections({} as ICollectionSchema);
        })
        .finally(() => {
          setIsLoadingCollection(false);
        });
    },
    [setCollections]
  );

  return {
    getCollection,
    collections,
    isLoadingCollection,
  };
}
//TODO https://api.themoviedb.org/3/collection/2602?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=pt-BR
