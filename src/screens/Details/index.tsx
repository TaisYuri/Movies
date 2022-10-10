import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  useWindowDimensions,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components/Header";
import Icon from "react-native-vector-icons/AntDesign";
import api from "../../../services/api";
import { hoursToMinutes, minutesToHours } from "date-fns";
import {
  BoxCard,
  BoxProvider,
  BoxRow,
  Container,
  ImageProvider,
  Label,
  NotFound,
  ProductionCompany,
  Section,
  TextSmall,
  SubTitle,
  SubTitleProvider,
  Title,
} from "./styles";
import { Tag } from "../../components/Tag";
import { IImage, IMovieDetails, IProductionCompany, IProvider, RouteParams } from "./types";
import LottieView from "lottie-react-native";
import { MoreInformation } from "./MoreInformation";

export function Details() {
  const routeNavigation = useRoute();
  const { id } = routeNavigation.params as RouteParams;
  const navigation = useNavigation();
  const animation = useRef(null);
  const layout = useWindowDimensions();
  const [movie, setMovie] = useState<IMovieDetails>({} as IMovieDetails);
  const [provider, setProvider] = useState(null);
  const [productionCompany, setProductionCompany] = useState({} as IProductionCompany);

  const [image, SetImage] = useState<IImage>({} as IImage);
  const [loading, setLoading] = useState(false);
  const hour = minutesToHours(Number(movie.runtime));
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [index, setIndex] = React.useState(0);

  async function movieDetail(item: string) {
    setLoading(true);
    await api
      .get(`/${item}?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=pt-BR`)
      .then((response) => {
        setMovie(response.data);
        setProductionCompany(response.data.production_companies[0]);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  async function providerDetail(item: string) {
    setLoading(true);
    await api
      .get(`/${item}/watch/providers?api_key=856d12c0c4ce7988a3a8486fc485fad4`)
      .then((response) => {
        setProvider(response.data.results.BR.flatrate);
      })
      .catch((err) => {
        setProvider(null);
        // console.error("ops! ocorreu um erro" + err);
      });
  }

  async function imageDetail(item: string) {
    setLoading(true);

    await api
      .get(`/${item}/images?api_key=856d12c0c4ce7988a3a8486fc485fad4`)
      .then((response) => {
        SetImage(response.data.backdrops[0]);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      movieDetail(id);
      imageDetail(id);
      providerDetail(id);

      return () => {
        setMovie({} as IMovieDetails);
      };
    }, [id])
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
  );

  const renderScene = SceneMap({
    first: MoreInformation,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#FF4451" }}
      style={{ backgroundColor: "#1F222A" }}
      activeColor="#FF4451"
      inactiveColor="#fff"
      getLabelText={({ route }) => route.title}
      labelStyle={{ textTransform: "none" }}
    />
  );

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: "#eee",
          }}
          source={require("../../assets/movie_lottie.json")}
        />
      </View>
    );
  }
  console.log('FILMS', productionCompany)
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            backgroundColor: scrollY.interpolate({
              inputRange: [0, 130, 250],
              outputRange: ["transparent", "#1f222a61", "#1f222a"],
              extrapolate: "clamp",
            }),
          },
          style.containerHeader,
        ]}
      >
        <Icon
          name="arrowleft"
          size={24}
          color="white"
          onPress={navigation.goBack}
        />
        <Title>Detalhes</Title>
        <Icon name="search1" size={24} color="white" />
      </Animated.View>
      <Animated.Image
        style={{
          height: scrollY.interpolate({
            inputRange: [0, 130, 250],
            outputRange: [250, 130, 60],
            extrapolate: "clamp",
          }),
          width: "100%",
        }}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${image.file_path}`,
        }}
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
        <Container style={{ flex: 1 }}>
          <BoxRow>
            <Title>{movie.title}</Title>
            <BoxRow>
              <Icon name="star" color="red" weight="fill" size={15} />
              <SubTitle>{Number(movie.vote_average).toFixed(1)}</SubTitle>
            </BoxRow>
          </BoxRow>
          <Section>
            <SubTitle>{String(movie.release_date).slice(0, 4)} ●</SubTitle>
            <SubTitle>{`${hour}h${hoursToMinutes(
              Number(movie.runtime) / 60 - hour
            )}m`}</SubTitle>
          </Section>
          <BoxCard>
            {movie?.genres?.map((item) => (
              <View key={item.id}>
                <Tag label={item.name} />
              </View>
            ))}
          </BoxCard>
          <View style={{ width: "100%", height: 900 }}>
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
            <TextSmall numberOfLines={5}>{movie.overview}</TextSmall>
           <Label>Distribuido por:</Label>
            <ProductionCompany>
           <ImageProvider
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500/${productionCompany.logo_path}`,
                      }}
                    />
            <TextSmall>{productionCompany.name}</TextSmall>
            </ProductionCompany>
            <TabView
              navigationState={{
                index: 0,
                routes: [
                  { key: "first", title: "More details" },
                  { key: "second", title: "Trailers" },
                ],
              }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={renderTabBar}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                paddingTop: 300,
              }}
            />
          </View>
        </Container>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  containerHeader: {
    zIndex: 99,
    justifyContent: "space-between",
    alignItems: "baseline",
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    height: 60,
  },
});
