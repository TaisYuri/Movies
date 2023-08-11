import React from 'react';
import {
  Container,
  Content,
  Button,
  BorderButton,
  ButtonContentSelected,
} from './styles';
import { ICustomTabBar } from './types';
import Theme from '../../theme/Theme';

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: ICustomTabBar): JSX.Element {
  const themeColors = Theme;

  return (
    <Container>
      <Content
        style={{
          // elevação para IOS
          shadowOffset: { height: 0.2, width: 0 },
          shadowColor: themeColors.colors.base_alternative,
          shadowOpacity: 0.2,
          shadowRadius: 3.8,
        }}
      >
        {state.routes.map((route, index) => {
          // percorre todas as rotas
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = (): void => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({
                name: route.name,
                params: route.params,
                merge: true,
              });
            }
          };

          const onLongPress = (): void => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Button
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
            >
              <BorderButton>
                <ButtonContentSelected isFocused={isFocused}>
                  {options?.tabBarIcon?.({
                    color: isFocused
                      ? themeColors.colors.primary
                      : themeColors.colors.background,
                    focused: isFocused,
                    size: 25,
                  })}
                </ButtonContentSelected>
              </BorderButton>
            </Button>
          );
        })}
      </Content>
    </Container>
  );
}
