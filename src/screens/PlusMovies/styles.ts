import styled from 'styled-components/native';

export const Scroll = styled.ScrollView`
  padding-top: 70px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContainerBox = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 90px;
  justify-content: center;
`;

export const BoxCard = styled.View`
  margin: 4px;
`;
