import styled from "styled-components/native";

export const Scroll = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.background};
`;


export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  font-size: 16px;
`;

export const BoxCard = styled.Text`
  margin: 8px;
`;
