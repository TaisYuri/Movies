import styled from "styled-components/native";

export const Container = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const BoxRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  margin-top: 10px;
  font-size: 20px;
  max-width: 80%;
`;
export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  margin-left: 10px;
  font-size: 18px;
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  margin-left: -10px;
`;

export const BoxCard = styled.View`
  flex-direction: row;
  margin-top: 8px;
  flex-wrap: wrap;
`;

export const TextSmall = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  margin-top: 24px;
  font-size: 12px;
`;
export const TextMedium = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  margin-top: 24px;
  font-size: 14px;
`;

export const NotFound = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  margin-top: 5px;
  margin-bottom: 12px;
  font-size: 14px;
`;
export const SubTitleProvider = styled.Text`
  color: ${({theme}) => theme.colors.subtitle};
  margin-top: 15px;
  margin-bottom: 8px;
  font-size: 18px;
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
export const ImageCompany= styled.Image`
  width: 70px;
  height: 70px;
  margin-top: 3px;
`;

export const Label = styled.Text`
  color: ${({theme}) => theme.colors.subtitle};
  font-size: 15px;
  margin-top: 15px;
`;
