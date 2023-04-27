import styled from "styled-components/native";

export const Box = styled.View`
  flex: 1;
`;
export const Container = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;
