import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex-grow: 1;
  margin-bottom: 40px;
`;

export const BoxPerson = styled.View`
  padding: 16px 8px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
export const BoxDirector = styled.View`
  padding: 0px 10px;
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: 14px;
  margin-top: 10px;
`;
export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  font-size: 14px;
`;

export const BoxCard = styled.View`
  flex-direction: row;
  margin-left: 10px;
  margin-top: 16px;
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
