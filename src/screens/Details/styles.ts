import styled from "styled-components/native";

export const Box = styled.View`
  flex: 1;
`;
export const Container = styled.View`
 /* margin-top: -100px; */
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;
export const Title = styled.Text`
color: #fff`