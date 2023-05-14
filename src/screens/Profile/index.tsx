import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

export function Profile(): JSX.Element {
  return (
    <View style={{ flex: 1, display: 'flex' }}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.2, 1]}
        colors={['#5ca896', '#1E1E1E', '#995163']}
        // style={{ flex: 1 }}
      >
        <Text>Profile</Text>
      </LinearGradient>
    </View>
  );
}
