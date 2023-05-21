import styled from 'styled-components/native';

export const Container = styled.View``;
export const ContentImage = styled.View`
  position: absolute;
  top: 30%;
  bottom: 0;
  right: 0;
  left: 37%;
`;

export const TagText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;
