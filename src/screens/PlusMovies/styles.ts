import styled from 'styled-components/native';

export const Scroll = styled.ScrollView`
  padding-top: 50px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContainerBox = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 50px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  font-size: 16px;
`;

export const BoxCard = styled.View`
  margin: 8px;
`;
