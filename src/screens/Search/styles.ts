import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 80px 16px 0 16px;
  gap: 8px;
`;

export const Diviser = styled.View`
  background-color: ${({ theme }) => theme.colors.base_alternative};
  width: 30%;
  height: 1px;
`;

export const Scroll = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.background};
  margin-top: 16px;
`;

export const ContentCards = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  /* width: 48%; */
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const Poster = styled.Image`
  width: 110px;
  height: 120px;
  border-radius: 12px;
`;
export const PosterWithOutImage = styled.View`
  width: 110px;
  height: 120px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const BoxText = styled.View`
  flex: 1;
  justify-content: flex-start;
  margin-left: 8px;
  margin-top: 8px;
`;
export const ContentGenre = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
`;

export const InfoTitle = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;
export const InfoGenres = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  font-size: 12px;
  text-decoration: underline;
`;
export const Info = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  font-size: 16px;
  margin-bottom: 4px;
`;
