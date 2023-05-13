import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  align-items: center;
  justify-content: center;
`;
