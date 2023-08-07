import styled from 'styled-components/native';

export const Container = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-right: 10px;
`;
export const ContentTitles = styled.View`
  display: flex;
  max-width: 76%;
  min-width: 60%;
  flex: 1;
`;
export const ContentoVote = styled.View``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  margin-top: 10px;
  font-size: 28px;
  font-family: ${({ theme }) => theme.fonts.bold};
  /* max-width: 90%; */
`;
export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  margin-left: 10px;
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  margin-left: -10px;
`;

export const BoxCard = styled.View`
  flex-direction: row;
  margin-top: 16px;
  flex-wrap: wrap;
`;

export const TextSmall = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  margin-top: 24px;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
export const TextMedium = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  margin-bottom: 16px;
  font-size: 16px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const NotFound = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  margin-top: 5px;
  margin-bottom: 12px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
export const SubTitleProvider = styled.Text`
  color: ${({ theme }) => theme.colors.subtitle};
  margin-top: 15px;
  margin-bottom: 8px;
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const BoxProvider = styled.ScrollView`
  /* flex-direction: row;
  align-items: baseline; */
`;
export const ProductionCompany = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ImageProvider = styled.Image`
  width: 45px;
  height: 45px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 8px;
`;
export const ImageCompany = styled.View`
  width: 100px;
  height: 60px;
  background-color: #3a4252;
  border-radius: 8px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: 15px;
  margin-top: 15px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
