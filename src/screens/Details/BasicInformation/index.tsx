import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { hoursToMinutes, minutesToHours } from "date-fns";
import { BoxCard, BoxProvider, BoxRow, ImageCompany, ImageProvider, Label, NotFound, ProductionCompany, Section, SubTitle, SubTitleProvider, TextMedium, TextSmall, Title } from "./styles";
import { IBasicInformation } from "./types";
import { Tag } from "../../../components/Tag";

export function BasicInformation({
  runtime,
  title,
  vote_average,
  release_date,
  genres,
  overview,
  provider,
  logo_path
}: IBasicInformation) {
  const hour = minutesToHours(Number(runtime));

  return (
    <>
      <BoxRow>
        <Title>{title}</Title>
        <BoxRow>
          <Icon name="star" color="red" weight="fill" size={15} />
          <SubTitle>{Number(vote_average).toFixed(1)}</SubTitle>
        </BoxRow>
      </BoxRow>
      <Section>
        <SubTitle>{String(release_date).slice(0, 4)} ●</SubTitle>
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
            {provider !== null ? (
              <>
                <BoxProvider>
                  {provider?.map((item) => (
                    <ImageProvider
                      key={item.provider_id}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500/${item.logo_path}`,
                      }}
                    />
                  ))}
                </BoxProvider>
              </>
            ) : (
              <NotFound>Não disponível</NotFound>
            )}
            {logo_path !== null && logo_path !== undefined ? (
              <>
                <TextSmall numberOfLines={5}>{overview}</TextSmall>
                <Label>Distribuido por:</Label>
                <ProductionCompany>
                  <ImageCompany
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${logo_path}`,
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
