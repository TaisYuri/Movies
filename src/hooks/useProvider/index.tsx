import { useCallback, useState } from 'react';
import { IProviderSchema } from './types';
import { optionsDefault } from 'src/services';
import axios from 'axios';
import { typeDetailProps } from '../useHandleTypeDetails/types';

export function useProvider(): {
  getProvider: (link: string, type: typeDetailProps) => void;
  isLoadingProvider: boolean;
  providers?: IProviderSchema[];
} {
  const [isLoadingProvider, setIsLoadingProvider] = useState(false);
  const [providers, setProviders] = useState<IProviderSchema[]>();

  const getProvider = useCallback(
    (id: string, type: typeDetailProps) => {
      const typeLink = String(type);

      setIsLoadingProvider(true);
      axios(
        optionsDefault({
          method: 'GET',
          url: `/${typeLink}/${id}/watch/providers`,
        })
      )
        .then(({ data }) => {
          setProviders(data?.results?.BR?.flatrate);
        })
        .catch((err) => {
          console.error(`ops! ocorreu um erro ${err}`);
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
