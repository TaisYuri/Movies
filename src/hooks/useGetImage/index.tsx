import { useCallback, useState } from "react";
import api from "src/services/api";
import Constants from "expo-constants";

export interface IImageSchema {
  poster: string;
  file_path: string;
}

export function useGetImage(): {
  getImage: (link: string) => void;
  isLoadingImage: boolean;
  filePath: IImageSchema;
} {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [filePath, setFilePath] = useState<IImageSchema>();

  const getImage = useCallback(
    (link: string) => {
      setIsLoadingImage(true);
      api
        .get(`/${link}/images?api_key=${Constants?.expoConfig?.extra?.api_key}`)
        .then(({ data }) => {
          setFilePath({
            file_path: data?.backdrops[0]?.file_path,
            poster: data?.posters[0]?.file_path,
          });
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
          setFilePath({} as IImageSchema);
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
