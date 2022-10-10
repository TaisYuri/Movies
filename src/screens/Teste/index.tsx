import React, { useEffect, useState } from "react";
import { Animated, Button, ScrollView, View, Text } from "react-native";


export function Teste2() {
  const [scrollY, setScrollY] = useState(new Animated.Value(0))

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Animated.View style={{ 
        height: scrollY.interpolate({
            inputRange: [10, 160, 185],
            outputRange: [300, 20, 10],
            extrapolate: 'clamp'
          }),
          backgroundColor: 'yellow'
        }}>
    <View style={{width: '100%', height: 300, backgroundColor:'green'}}>
      <Text>AAAAAAA</Text>
    </View>
    
      </Animated.View>
        <ScrollView contentContainerStyle={{  backgroundColor: '#1919' }}
        onScroll={ Animated.event([{
          nativeEvent: {
            contentOffset: { y: scrollY}
          }
        }],
        { useNativeDriver: false})}
        >
        <View style={{width: '100%', height: 300, backgroundColor:'#c1c1c1', marginBottom: 10}}/>
        <View style={{width: '100%', height: 300, backgroundColor:'#c1c1c1', marginBottom: 10}}/>
        <View style={{width: '100%', height: 300, backgroundColor:'#c1c1c1', marginBottom: 10}}/>
        <View style={{width: '100%', height: 300, backgroundColor:'#c1c1c1'}}/>

        </ScrollView>
    </View>
  );
}
