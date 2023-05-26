import styled from 'styled-components/native';

export const ContainerBox = styled.View`
  margin-top: 24px;
`;

export const Content = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 48%;
  margin-bottom: 8px;
  opacity: 0.7;
`;

export const BoxText = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 8px;
`;

export const Info = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  font-size: 12px;
`;

export const Poster = styled.Image`
  width: 90px;
  height: 100px;
  border-radius: 12px;
`;
