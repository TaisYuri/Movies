import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { ButtonPrimary } from 'src/components/Buttons/ButtonPrimary';
import { useFavorite } from 'src/hooks/useFavorite';
import { useThemeStore } from 'src/states/themeState';

export function Profile(): JSX.Element {
  // const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { favorites, getFavorite } = useFavorite();
  const { setData, themeLight } = useThemeStore();

  const handleButton = () => {
    setData(!themeLight);
  };

  useFocusEffect(
    useCallback(() => {
      getFavorite();
    }, [])
  );

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
        <ButtonPrimary hasIcon={false} onPress={handleButton}>
          Trocar Tema
        </ButtonPrimary>

        <Text>Retornooooo</Text>
        {favorites?.map((item, index) => (
          <View key={index} style={{ margin: 10 }}>
            <Text>{item.id}</Text>
            <Text>{item.title}</Text>
          </View>
        ))}
      </LinearGradient>
    </View>
  );
}
