import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { IHeaderAnimation } from './types';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'styled-components/native';
import { ButtonFavorite } from '../Buttons/ButtonFavorite';
import { useFavorite } from 'src/hooks/useFavorite';
import AnimatedLottieView from 'lottie-react-native';

export function HeaderAnimation({
  image,
  scrollY,
  id,
  type,
}: IHeaderAnimation): JSX.Element {
  const navigation = useNavigation();
  const theme = useTheme();
  const inputRangeToAnimated = [0, 60, 120, 180, 240, 300];

  const AnimatedGradientHelper =
    Animated.createAnimatedComponent(LinearGradient);

  const { handleFavorite, hasFavorite } = useFavorite(id);
  const animation = useRef(null);

  return (
    <>
      <Animated.View
        style={[
          {
            backgroundColor: scrollY.interpolate({
              inputRange: inputRangeToAnimated,
              outputRange: [
                'transparent',
                'transparent',
                theme.colors.grays.grayscale_100,
                theme.colors.grays.grayscale_100,
                theme.colors.grays.grayscale_200,
                theme.colors.grays.grayscale_300,
              ],
              extrapolate: 'clamp',
            }),
          },
          style.containerHeader,
        ]}
      >
        <TouchableOpacity style={{ padding: 8 }} onPress={navigation.goBack}>
          <Icon name="arrowleft" size={24} color={theme.colors.base} />
        </TouchableOpacity>
        <Animated.Text
          style={{
            opacity: scrollY.interpolate({
              inputRange: inputRangeToAnimated,
              outputRange: [0, 0.25, 0.25, 0.5, 0.75, 1],
            }),
            color: theme.colors.base,
            fontSize: 20,
            marginRight: 8,
          }}
        >
          Detalhes
        </Animated.Text>
        {type === 'movie' && (
          <ButtonFavorite
            onPress={() => {
              void handleFavorite();
            }}
            hasFavorite={hasFavorite}
          />
        )}
      </Animated.View>

      {(image ?? '').length > 0 ? (
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${image}`,
          }}
          // resizeMode="stretch"
        >
          <AnimatedGradientHelper
            colors={[
              'transparent',
              'transparent',
              theme.colors.grays.grayscale_100,
              theme.colors.grays.grayscale_200,
              theme.colors.grays.grayscale_300,
            ]}
            style={{
              width: '100%',
              height: scrollY.interpolate({
                inputRange: inputRangeToAnimated,
                outputRange: [240, 200, 160, 120, 80, 60],

                extrapolate: 'clamp',
              }),
            }}
          ></AnimatedGradientHelper>
        </ImageBackground>
      ) : (
        <AnimatedGradientHelper
          colors={[
            '#e6e7e9',
            '#b5b8be',
            '#848993',
            '#535a68',
            '#3a4252',
            '#222b3d',
          ]}
          style={{
            width: '100%',
            height: scrollY.interpolate({
              inputRange: inputRangeToAnimated,
              outputRange: [200, 180, 160, 120, 80, 60],

              extrapolate: 'clamp',
            }),
          }}
        >
          <AnimatedLottieView
            autoPlay
            ref={animation}
            style={{
              width: 120,
              height: 120,
            }}
            source={require('../../assets/movie-header.json')}
          />
        </AnimatedGradientHelper>
      )}
    </>
  );
}

const style = StyleSheet.create({
  containerHeader: {
    zIndex: 99,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    paddingLeft: 8,
    height: 60,
  },
});
