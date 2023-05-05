import styled from "styled-components/native";

export const ContainerBox = styled.View`
  margin-top: 24px;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: row;
  width: 48%;
  margin-bottom: 8px;
`;

export const BoxText = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 8px;


`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 10px;
  font-size: 20px;
  max-width: 80%;
`;

export const Info = styled.Text`
  color: #fff;
`;

export const Poster = styled.Image`
  width: 90px;
  height: 100px;
  border-radius: 12px;
`;
