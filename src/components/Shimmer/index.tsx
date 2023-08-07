import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { Container, ContentShimmerPerson, ContentShimmerMovie } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { IShimmer } from './types';

export function Shimmer({ size, typeCard }: IShimmer): JSX.Element {
  const AnimatedView = Animated.createAnimatedComponent(LinearGradient);
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-110, 110],
  });

  if (typeCard === 'person') {
    return (
      <Container>
        <ContentShimmerPerson size={size}>
          <AnimatedView
            colors={['#c2c2c2', '#b0b0b0', '#b0b0b0', '#c2c2c2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              StyleSheet.absoluteFillObject,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </ContentShimmerPerson>
      </Container>
    );
  }

  return (
    <Container>
      <ContentShimmerMovie size={size}>
        <AnimatedView
          colors={['#c2c2c2', '#b0b0b0', '#b0b0b0', '#c2c2c2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </ContentShimmerMovie>
    </Container>
  );
}
