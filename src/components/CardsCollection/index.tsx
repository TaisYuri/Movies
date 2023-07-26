import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ContainerBox, Content, Info, Poster, BoxText } from './styles';
import { type ICardCollection } from './types';
import { Title } from '../Title';

export function CardsCollection({
  title,
  data,
  idMovie,
}: ICardCollection): JSX.Element {
  const navigation = useNavigation();

  return (
    <ContainerBox>
      <Title>{title}</Title>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 10,
          justifyContent: 'space-between',
        }}
      >
        {data?.map((item) => {
          if (item?.id !== idMovie) {
            return (
              <Content
                key={item?.id}
                onPress={() => {
                  navigation.navigate('details', {
                    id: item.id,
                    type: 'movie',
                  });
                }}
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
          } else {
            return null;
          }
        })}
      </View>
    </ContainerBox>
  );
}
