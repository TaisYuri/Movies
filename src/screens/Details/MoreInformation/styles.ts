import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex-grow: 1;
`;

export const BoxPerson = styled.View`
  padding: 16px 10px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  margin-top: 10px;
  margin-bottom: 16px;
  font-size: 25px;
  max-width: 80%;
`;
export const Label = styled.Text`
  color: #5d5d5d;
  font-size: 15px;
`;
export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
`;

export const BoxCard = styled.View`
  flex-direction: row;
  margin-left: 10px;
`;

export const ContainerLoading = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ActivityIndicator = styled.ActivityIndicator`
  width: 120px;
  height: 120px;
`;

export const BoxSimiliar = styled.View`
  margin-right: -16px;
  margin-left: -16px;
`;
