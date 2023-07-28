/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import { CardsCollection } from 'src/components/CardsCollection';
import { ButtonPrimary } from 'src/components/Buttons/ButtonPrimary';
import { useHandleTypeDetails } from 'src/hooks/useHandleTypeDetails';
import { Seasons } from './Seasons';

export function Details(): JSX.Element {
  const routeNavigation = useRoute();
  const { id, type } = routeNavigation.params as RouteParams;
  const navigation = useNavigation();

  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const itemDetail = useHandleTypeDetails({ type, id });

  useFocusEffect(
    useCallback(() => {
      setScrollY(new Animated.Value(0));
    }, [id])
  );

  if (itemDetail?.loading) {
    return <Loading />;
  }
  return (
    <>
      <HeaderAnimation
        image={itemDetail?.filePath?.file_path}
        scrollY={scrollY}
        id={id}
        type={type}
      />

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
            title={itemDetail?.value?.title ?? itemDetail?.valueTv?.title}
            runtime={itemDetail?.value?.runtime}
            voteAverage={
              itemDetail?.value?.voteAverage ?? itemDetail?.valueTv?.voteAverage
            }
            releaseDate={
              itemDetail?.value?.releaseDate ?? itemDetail?.valueTv?.releaseDate
            }
            genres={itemDetail?.value?.genres ?? itemDetail?.valueTv?.genres}
            overview={
              itemDetail?.value?.overview ?? itemDetail?.valueTv?.overview
            }
            provider={itemDetail?.providers}
            logoPath={itemDetail?.value?.production_companies}
            type={type}
          />
          {type === 'movie' && (
            <ContentButton>
              <ButtonPrimary
                onPress={() => {
                  navigation.navigate('trailers', { movieId: id });
                }}
                hasIcon
              >
                Assista ao Trailer
              </ButtonPrimary>
            </ContentButton>
          )}

          {itemDetail?.collections?.parts?.length != null &&
            itemDetail?.collections?.parts?.length > 0 && (
              <CardsCollection
                data={itemDetail?.collections?.parts}
                idMovie={id}
                title="Talvez você também precise assistir"
              />
            )}

          {Boolean(itemDetail?.valueTv?.seasons.length) && (
            <Seasons
              seasons={itemDetail?.valueTv?.seasons ?? []}
              tvId={itemDetail?.valueTv?.id}
            />
          )}

          <MoreInformation detailType={type} />
        </Container>
      </ScrollView>
    </>
  );
}
