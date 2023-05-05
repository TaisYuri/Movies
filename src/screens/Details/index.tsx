import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Animated, ScrollView, useWindowDimensions, View, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Container, Box,Title } from "./styles";
import { IProductionCompany, RouteParams } from "./types";
import { MoreInformation } from "./MoreInformation";
import { Loading } from "src/components/Loading";
import { theme } from "src/theme/styles";
import { HeaderAnimation } from "../../components/HeaderAnimation";
import { BasicInformation } from "./BasicInformation";
import { Trailer } from "./Trailer";
import { useGetDetailMovie } from "src/hooks/useGetDetailMovie";
import { useGetImage } from "src/hooks/useGetImage";
import { useProvider } from "src/hooks/useProvider";
import { useCollection } from "src/hooks/useCollection";
import { ListCards } from "src/components/ListCards";
import { CardsCollection } from "src/components/CardsCollection";

//TODO https://api.themoviedb.org/3/collection/2602?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=pt-BR
//COLLECTIONS
export function Details() {
  const routeNavigation = useRoute();
  const { id } = routeNavigation.params as RouteParams;
  const layout = useWindowDimensions();

  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [index, setIndex] = React.useState(0);

  const { getDetail, isLoading, value } = useGetDetailMovie({ page: "1" });
  const { getImage, filePath, isLoadingImage } = useGetImage();
  const { getProvider, providers, isLoadingProvider } = useProvider();
  const { getCollection, collections, isLoadingCollection } = useCollection();

  useFocusEffect(
    useCallback(() => {
      getImage(id);

      getDetail(id);
      // STREAM DE ONDE PODE SER ASSISTIDO
      getProvider(id);

      setScrollY(new Animated.Value(0));
    }, [id])
  );

  useEffect(() => {
    if (value?.belongs_to_collection?.id) {
      getCollection(value?.belongs_to_collection?.id);
    }
  }, [value]);
  
  const renderScene = SceneMap({
    first: MoreInformation,
    second: () => <Trailer movie_id={id} />,
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

  if (isLoading || isLoadingImage || isLoadingProvider || isLoadingCollection) {
    return <Loading />;
  }
  return (
    <Box>
      <HeaderAnimation image={filePath?.file_path} scrollY={scrollY} />
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
            title={value?.title}
            runtime={value?.runtime}
            vote_average={value?.vote_average}
            release_date={value?.release_date}
            genres={value?.genres}
            overview={value?.overview}
            provider={providers}
            logo_path={value?.production_companies}
          />

          <View>
            <CardsCollection data={collections?.parts} title="Talvez você também precise assistir"/>
          </View>
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
                paddingTop: 20,
              }}
            />
          </View>
        </Container>
      </ScrollView>
    </Box>
  );
}
