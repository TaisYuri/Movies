import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Animated, ImageBackground, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { IHeaderAnimation } from './types';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'styled-components/native';

export function HeaderAnimation({
  image,
  scrollY,
}: IHeaderAnimation): JSX.Element {
  const navigation = useNavigation();
  const theme = useTheme();
  const inputRangeToAnimated = [0, 60, 120, 180, 240, 300, 360, 420];

  const AnimatedGradientHelper =
    Animated.createAnimatedComponent(LinearGradient);

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
        <Icon
          name="arrowleft"
          size={24}
          color={theme.colors.base}
          onPress={navigation.goBack}
        />
        <Animated.Text
          style={{
            opacity: scrollY.interpolate({
              inputRange: inputRangeToAnimated,
              outputRange: [0, 0.25, 0.25, 0.25, 0.5, 0.5, 0.75, 1],
            }),
            color: theme.colors.base,
            fontSize: 20,
          }}
        >
          Detalhes
        </Animated.Text>
      </Animated.View>

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
              outputRange: [320, 280, 240, 200, 160, 120, 80, 60],
              extrapolate: 'clamp',
            }),
          }}
        ></AnimatedGradientHelper>
      </ImageBackground>
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
    paddingHorizontal: 16,
    height: 60,
  },
});
