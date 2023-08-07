import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign';
import { hoursToMinutes, minutesToHours } from 'date-fns';
import {
  BoxCard,
  BoxProvider,
  ContentHeader,
  ImageProvider,
  Section,
  SubTitle,
  SubTitleProvider,
  TextMedium,
  Title,
  ContentTitles,
  ImageCompany,
  NotFound,
} from './styles';
import { IBasicInformation } from './types';
import { Tag } from 'src/components/Tag';
import { VoteAverage } from 'src/components/VoteAverage';

export function BasicInformation({
  runtime,
  title,
  voteAverage,
  releaseDate,
  genres,
  overview,
  provider,
  logoPath,
  type,
}: IBasicInformation): JSX.Element {
  const hour = minutesToHours(Number(runtime));

  const header = useCallback(() => {
    if (type === 'movie') {
      return (
        <ContentTitles>
          <Title>{title}</Title>
          <Section>
            <SubTitle>{String(releaseDate).slice(0, 4)} ●</SubTitle>
            <SubTitle>{`${hour}h${hoursToMinutes(
              Number(runtime) / 60 - hour
            )}m`}</SubTitle>
          </Section>
        </ContentTitles>
      );
    } else {
      return (
        <ContentTitles>
          <Title>{title}</Title>
          <Section>
            <SubTitle>
              Exibido pela primeira vez em: {String(releaseDate).slice(0, 4)}
            </SubTitle>
          </Section>
        </ContentTitles>
      );
    }
  }, [type]);

  return (
    <>
      <ContentHeader>
        {header()}
        <VoteAverage label={Number(voteAverage).toFixed(1)} />
      </ContentHeader>

      <BoxCard>
        {genres?.map((item) => (
          <View key={item.id}>
            <Tag label={item.name} />
          </View>
        ))}
      </BoxCard>

      <SubTitleProvider>Produtora</SubTitleProvider>
      {logoPath?.length != null && logoPath?.length > 0 ? (
        <ImageCompany>
          <Image
            key={logoPath}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${logoPath}`,
            }}
            style={{ width: 100, height: 60 }}
            resizeMode="contain"
          />
        </ImageCompany>
      ) : (
        <NotFound>Informação não disponivel</NotFound>
      )}

      {provider?.length != null && provider?.length > 0 && (
        <>
          <SubTitleProvider>Onde assistir</SubTitleProvider>
          <BoxProvider horizontal showsHorizontalScrollIndicator={false}>
            {provider?.map((item) => (
              <ImageProvider
                key={item?.provider_id}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item?.logo_path}`,
                }}
              />
            ))}
          </BoxProvider>
        </>
      )}

      <SubTitleProvider>Sinopse</SubTitleProvider>
      {overview?.length != null && overview?.length > 0 ? (
        <TextMedium numberOfLines={10}>{overview}</TextMedium>
      ) : (
        <NotFound>Informação não disponivel</NotFound>
      )}
    </>
  );
}
