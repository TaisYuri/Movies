import React from "react";
import { View} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ContainerBox, Content, Info, Title, Poster, BoxText } from "./styles";
import { ICardCollection } from "./types";

export function CardsCollection({ title, 
  data, 
  idMovie 
}: ICardCollection) {
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
          justifyContent: "space-between",
        }}
      >
        {data?.map((item) => 
        {
          if (item?.id !== idMovie) {
            return (
              <Content key={item?.id} 
              onPress={() => navigation.navigate("details", { id: item.id })}
              >
                {item?.poster_path !== undefined &&
                item?.poster_path !== null && (
                  <Poster
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${item?.poster_path}`,
                    }}
                    resizeMode="contain"
                  />
                )}
                <BoxText>
                  <Info>{item?.title}</Info>
                    <Info>{item?.release_date}</Info>
                </BoxText>
              </Content>
            );
          }
        })}
      </View>
    </ContainerBox>
  );
}
