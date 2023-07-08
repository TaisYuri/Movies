import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  flex: 1;
  /* opacity: 0.7; */
`;

export const Poster = styled.Image`
  width: 170px;
  height: 220px;
  border-radius: 12px;
`;
export const PosterWithoutImg = styled.View`
  width: 170px;
  height: 220px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const TextWithoutImg = styled.Text`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.base};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Note = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.base};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const BoxNote = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 3px 10px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 8px;
`;
export const BoxFavorite = styled.TouchableOpacity`
  position: absolute;
  bottom: 8px;
  left: 8px;
`;

export const BoxRelease = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 3px 10px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
