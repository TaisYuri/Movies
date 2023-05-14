import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { hoursToMinutes, minutesToHours } from 'date-fns';
import {
  BoxCard,
  BoxProvider,
  BoxRow,
  ImageCompany,
  ImageProvider,
  Label,
  NotFound,
  ProductionCompany,
  Section,
  SubTitle,
  SubTitleProvider,
  TextMedium,
  TextSmall,
  Title,
} from './styles';
import { IBasicInformation } from './types';
import { Tag } from 'src/components/Tag';

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
      <BoxRow>
        <Title>{title}</Title>
        <BoxRow>
          <Icon name="star" color="red" size={15} />
          <SubTitle>{Number(voteAverage).toFixed(1)}</SubTitle>
        </BoxRow>
      </BoxRow>
      <Section>
        <SubTitle>{String(releaseDate).slice(0, 4)} ●</SubTitle>
        <SubTitle>{`${hour}h${hoursToMinutes(
          Number(runtime) / 60 - hour
        )}m`}</SubTitle>
      </Section>
      <BoxCard>
        {genres?.map((item) => (
          <View key={item.id}>
            <Tag label={item.name} />
          </View>
        ))}
      </BoxCard>
      <SubTitleProvider>Stream</SubTitleProvider>
      {provider?.length != null && provider?.length > 0 ? (
        <BoxProvider horizontal showsHorizontalScrollIndicator={false}>
          {provider?.map((item) => (
            <ImageProvider
              key={item?.provider_id}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item?.logoPath}`,
              }}
            />
          ))}
        </BoxProvider>
      ) : (
        <NotFound>Não disponível</NotFound>
      )}
      {logoPath !== null && logoPath !== undefined ? (
        <>
          <TextSmall numberOfLines={5}>{overview}</TextSmall>
          <Label>Distribuido por:</Label>
          <ProductionCompany>
            <ImageCompany
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${logoPath}`,
              }}
              resizeMode="contain"
            />
          </ProductionCompany>
        </>
      ) : (
        <TextMedium numberOfLines={10}>{overview}</TextMedium>
      )}
    </>
  );
}
