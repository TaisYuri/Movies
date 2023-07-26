import { useFocusEffect } from '@react-navigation/native';
import { useGetDetailMovie } from 'src/hooks/useGetDetailMovie';
import { useGetImage } from 'src/hooks/useGetImage';
import { useProvider } from 'src/hooks/useProvider';
import { useCollection } from 'src/hooks/useCollection';
import { useCallback } from 'react';
import { handleTypeDetailProps } from './types';
import { useGetDetailTv } from '../useGetDetailTv';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useHandleTypeDetails({ type, id }: handleTypeDetailProps) {
  const typeDetail = String(type);
  if (typeDetail === 'movie') {
    const { getDetail, value, isLoading } = useGetDetailMovie({ page: '1' });
    const { getImage, filePath, isLoadingImage } = useGetImage();
    const { getProvider, providers, isLoadingProvider } = useProvider();
    const { getCollection, collections, reset, isLoadingCollection } =
      useCollection();

    useFocusEffect(
      useCallback(() => {
        getImage(id, type);
        getDetail(id);
        // STREAM DE ONDE PODE SER ASSISTIDO
        getProvider(id, type);
      }, [id])
    );

    useFocusEffect(
      useCallback(() => {
        if (value?.belongs_to_collection?.id != null) {
          getCollection(value?.belongs_to_collection?.id);
          return;
        }
        reset();
      }, [value])
    );

    const loading =
      isLoading || isLoadingImage || isLoadingProvider || isLoadingCollection;

    return {
      loading,
      value,
      filePath,
      providers,
      collections,
    };
  } else {
    const { getDetailTv, isLoading, valueTv } = useGetDetailTv();
    const { getImage, filePath, isLoadingImage } = useGetImage();
    const { getProvider, providers, isLoadingProvider } = useProvider();

    useFocusEffect(
      useCallback(() => {
        getImage(id, type);
        getDetailTv(id);
        getProvider(id, type);
      }, [id])
    );

    const loading = isLoading || isLoadingImage || isLoadingProvider;

    return {
      valueTv,
      filePath,
      loading,
      providers,
    };
  }
}
