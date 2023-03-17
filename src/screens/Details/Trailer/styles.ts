import styled from "styled-components/native";

export const VIDEO_HEIGHT = 210;

export const Container = styled.View`
  flex: 1;
`;

export const BoxVideo = styled.View`
  justify-content: center;
  align-items: center;
  display: flex;

`;
export const BoxLoading = styled.View`
  justify-content: center;
  align-items: center;
  display: flex;
  height: ${VIDEO_HEIGHT}px;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  margin-top: 16px;
  margin-bottom: 10px;
  font-size: 17px;
`;

                                                                                                                                                                   