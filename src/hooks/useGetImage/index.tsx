import { useCallback, useState } from 'react';
import { IImageSchema } from './types';
import axios from 'axios';
import Constants from 'expo-constants';

export function useGetImage(): {
  getImage: (link: string) => void;
  isLoadingImage: boolean;
  filePath?: IImageSchema;
} {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [filePath, setFilePath] = useState<IImageSchema>();

  const getImage = useCallback(
    (link: string) => {
      setIsLoadingImage(true);
      axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${link}/images`,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${Constants?.expoConfig?.extra?.access_token}`,
        },
      })
        .then(({ data }) => {
          setFilePath({
            file_path: data?.backdrops[0]?.file_path,
            poster: data?.posters[0]?.file_path,
          });
        })
        .catch((err) => {
          console.error(`ops! ocorreu um erro ${err}`);
          setFilePath(undefined);
        })
        .finally(() => {
          setIsLoadingImage(false);
        });
    },
    [setFilePath]
  );

  return {
    getImage,
    filePath,
    isLoadingImage,
  };
}
