import { useCallback, useState } from 'react';
import { IImageSchema } from './types';
import axios from 'axios';
import Constants from 'expo-constants';
import { typeDetailProps } from '../useHandleTypeDetails/types';

export function useGetImage(): {
  getImage: (link: string, type: typeDetailProps) => void;
  isLoadingImage: boolean;
  filePath?: IImageSchema;
} {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [filePath, setFilePath] = useState<IImageSchema>();

  const getImage = useCallback(
    (link: string, type: typeDetailProps) => {
      const typeLink = String(type);
      setIsLoadingImage(true);
      axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/${typeLink}/${link}/images`,
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
