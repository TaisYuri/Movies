import { Platform } from "react-native";
import styled from "styled-components/native";

interface ColorButton {
  isFocused: boolean;
}

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;
export const Content = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: ${Platform.OS === "ios" ? 38 : 24}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  gap: 8px;
  border-radius: 99px;
  elevation: 8; //elevação para android
  //Elevação para IOS == shadow (adicionado inLine)
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const BorderButton = styled.View`
  align-items: center;
  padding: 4px;
`;

export const ButtonContentSelected = styled.View<ColorButton>`
  padding: 8px;
  border-radius: 99px;
  background-color: ${(props) =>
    props.isFocused ? props.theme.colors.primary_translucid : "transparent"};
`;
