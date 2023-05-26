import React from 'react';
import { View } from 'react-native';
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
  ContentoVote,
  Title,
  ContentTitles,
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
}: IBasicInformation): JSX.Element {
  const hour = minutesToHours(Number(runtime));

  return (
    <>
      <ContentHeader>
        <ContentTitles>
          <Title>{title}</Title>
          <Section>
            <SubTitle>{String(releaseDate).slice(0, 4)} ●</SubTitle>
            <SubTitle>{`${hour}h${hoursToMinutes(
              Number(runtime) / 60 - hour
            )}m`}</SubTitle>
          </Section>
        </ContentTitles>

        <ContentoVote>
          <VoteAverage label={Number(voteAverage).toFixed(1)} />
        </ContentoVote>
      </ContentHeader>

      <BoxCard>
        {genres?.map((item) => (
          <View key={item.id}>
            <Tag label={item.name} />
          </View>
        ))}
      </BoxCard>

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
      <TextMedium numberOfLines={10}>{overview}</TextMedium>
    </>
  );
}
