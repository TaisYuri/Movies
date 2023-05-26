import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Button = styled(TouchableOpacity)`
  background-color: transparent;
  padding: 8px 16px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  margin-right: 16px;
  margin-left: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.base};
`;
