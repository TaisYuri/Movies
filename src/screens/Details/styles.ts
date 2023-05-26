import styled from 'styled-components/native';

export const ContentButton = styled.View`
  margin-top: 24px;
  align-items: center;
`;

export const Container = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;
