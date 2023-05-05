import React from "react";
import { View, ListRenderItem, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderType } from "../HeaderType";
import { ContainerBox, Content, Info, Title, Poster, BoxText } from "./styles";
import { ICardCollection } from "./types";
import { IMovies } from "../../screens/Home/types";
import { BoxCard } from "../../screens/Home/styles";
import { Card } from "../Card";
import { PosterWithoutImg, TextWithoutImg } from "../Card/styles";

export function CardsCollection({ title, data }: ICardCollection) {
  const navigation = useNavigation();

  return (
    <ContainerBox>
      <Title>{title}</Title>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          // backgroundColor: "red",
          justifyContent:'space-between'
        }}
      >
        {data?.map((item) => (
          <Content>
            {item?.poster_path !== undefined && item?.poster_path !== null ? (
              <Poster
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item?.poster_path}`,
                }}
                resizeMode="contain"
              />
            ) : (
              <PosterWithoutImg>
                <TextWithoutImg>{item?.title}</TextWithoutImg>
              </PosterWithoutImg>
            )}
            <BoxText>
              <Info>{item?.title}</Info>
              <Info>{item?.release_date}</Info>
            </BoxText>
          </Content>
        ))}
      </View>
    </ContainerBox>
  );
}
