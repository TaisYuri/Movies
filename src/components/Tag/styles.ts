import styled from 'styled-components/native';

export const TagButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 6px 10px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  margin-left: 10px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const TagText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.regular};
`;
