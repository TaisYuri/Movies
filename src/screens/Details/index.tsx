import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Animated, ScrollView } from 'react-native';
import { Container, ContentButton } from './styles';
import { RouteParams } from './types';
import { MoreInformation } from './MoreInformation';
import { Loading } from 'src/components/Loading';
import { HeaderAnimation } from '../../components/HeaderAnimation';
import { BasicInformation } from './BasicInformation';
import { useGetDetailMovie } from 'src/hooks/useGetDetailMovie';
import { useGetImage } from 'src/hooks/useGetImage';
import { useProvider } from 'src/hooks/useProvider';
import { useCollection } from 'src/hooks/useCollection';
import { CardsCollection } from 'src/components/CardsCollection';
import { ButtonPrimary } from 'src/components/Buttons/ButtonPrimary';
import { ButtonFavorite } from 'src/components/Buttons/ButtonFavorite';
import { useFavorite } from 'src/hooks/useFavorite';

export function Details(): JSX.Element {
  const routeNavigation = useRoute();
  const { id } = routeNavigation.params as RouteParams;
  const navigation = useNavigation();

  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const { getDetail, isLoading, value } = useGetDetailMovie({ page: '1' });
  const { getImage, filePath, isLoadingImage } = useGetImage();
  const { getProvider, providers, isLoadingProvider } = useProvider();
  const { getCollection, collections, isLoadingCollection, reset } =
    useCollection();
  const { handleFavorite, hasFavorite } = useFavorite(id);

  useFocusEffect(
    useCallback(() => {
      getImage(id);

      getDetail(id);
      // STREAM DE ONDE PODE SER ASSISTIDO
      getProvider(id);

      setScrollY(new Animated.Value(0));
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

  if (isLoading || isLoadingImage || isLoadingProvider || isLoadingCollection) {
    return <Loading />;
  }
  return (
    <>
      <HeaderAnimation image={filePath?.file_path} scrollY={scrollY} />

      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        style={{ flex: 1 }}
      >
        <Container>
          <BasicInformation
            title={value?.title}
            runtime={value?.runtime}
            voteAverage={value?.voteAverage}
            releaseDate={value?.releaseDate}
            genres={value?.genres}
            overview={value?.overview}
            provider={providers}
            logoPath={value?.production_companies}
          />
          <ContentButton>
            <ButtonPrimary
              onPress={() => {
                navigation.navigate('trailers', { movieId: id });
              }}
              hasIcon
            >
              Assista ao Trailer
            </ButtonPrimary>
            <ButtonFavorite onPress={handleFavorite} hasFavorite={hasFavorite}>
              Favoritar
            </ButtonFavorite>
          </ContentButton>

          {collections?.parts?.length != null &&
            collections?.parts?.length > 0 && (
              <CardsCollection
                data={collections?.parts}
                idMovie={id}
                title="Talvez você também precise assistir"
              />
            )}

          <MoreInformation />
        </Container>
      </ScrollView>
    </>
  );
}
