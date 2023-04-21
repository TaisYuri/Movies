import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Animated, ScrollView, useWindowDimensions, View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import api from "../../../services/api";
import {
  Container,Box
} from "./styles";
import {
  IImage,
  IMovieDetails,
  IProductionCompany,
  RouteParams,
} from "./types";
import { MoreInformation } from "./MoreInformation";
import { ConexionApi } from "../../../services/ConectionApi";
import { Loading } from "../../components/Loading";
import { theme } from "../../theme/styles";
import { HeaderAnimation } from "../../components/HeaderAnimation";
import { BasicInformation } from "./BasicInformation";
import { Trailer } from "./Trailer";

export function Details() {
  const routeNavigation = useRoute();
  const { id } = routeNavigation.params as RouteParams;
  const layout = useWindowDimensions();

  const [movie, setMovie] = useState<IMovieDetails>({} as IMovieDetails);
  const [provider, setProvider] = useState(null);
  const [productionCompany, setProductionCompany] = useState(
    {} as IProductionCompany
  );
  const [image, setImage] = useState<IImage>({} as IImage);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [index, setIndex] = React.useState(0);

  // STREAM DE ONDE PODE SER ASSISTIDO
  async function providerDetail(item: string) {
    setLoading(true);
    await api
      .get(`/${item}/watch/providers?api_key=856d12c0c4ce7988a3a8486fc485fad4`)
      .then((response) => {
        setProvider(response.data.results.BR.flatrate);
      })
      .catch((err) => {
        setProvider(null);
      });
  }

  async function imageDetail(item: string) {
    setLoading(true);
    await api
      .get(`/${item}/images?api_key=856d12c0c4ce7988a3a8486fc485fad4`)
      .then((response) => {
        setImage(response.data.backdrops[0]);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      ConexionApi(
        id,
        (response) => {
          setMovie(response.data);
          setProductionCompany(response.data.production_companies[0]);
        },
        setLoading
      );
      providerDetail(id);
      imageDetail(id);
      setScrollY(new Animated.Value(0));

      return () => {
        setMovie({} as IMovieDetails);
      };
    }, [id])
  );

  const renderScene = SceneMap({
    first: MoreInformation,
    second: () => <Trailer movie_id={id}/>,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      style={{ backgroundColor: theme.colors.background }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.white}
      getLabelText={({ route }) => route.title}
      labelStyle={{ textTransform: "none" }}
    />
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <HeaderAnimation image={image?.file_path} scrollY={scrollY} />
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
            title={movie?.title}
            runtime={movie?.runtime}
            vote_average={movie?.vote_average}
            release_date={movie?.release_date}
            genres={movie?.genres}
            overview={movie.overview}
            provider={provider}
            logo_path={productionCompany?.logo_path}
          />

          <View style={{ width: "100%", height: layout.height - 120 }}>
            <TabView
              navigationState={{
                index: 0,
                routes: [
                  { key: "first", title: "Mais Informações" },
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
                paddingTop: 20
              }}
            />
          </View>
        </Container>
      </ScrollView>
    </Box>
  );
}
