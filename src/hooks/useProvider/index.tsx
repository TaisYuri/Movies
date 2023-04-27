import { useCallback, useState } from "react";
import api from "src/services/api";
import { IProviderSchema } from "./types";
import { API_KEY } from "src/env";

export function useProvider(): {
  getProvider: (link: string) => void;
  isLoadingProvider: boolean;
  providers: IProviderSchema[];
} {
  const [isLoadingProvider, setIsLoadingProvider] = useState(false);
  const [providers, setProviders] = useState<IProviderSchema[]>();

  const getProvider = useCallback(
    (id: string) => {
      setIsLoadingProvider(true);
      api
        .get(`/${id}/watch/providers?api_key=${API_KEY}`)
        .then(({ data }) => setProviders(data?.results?.BR?.flatrate))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
          setProviders([] as IProviderSchema[]);
        })
        .finally(() => {
          setIsLoadingProvider(false);
        });
    },
    [setProviders]
  );

  return {
    getProvider,
    providers,
    isLoadingProvider,
  };
}
