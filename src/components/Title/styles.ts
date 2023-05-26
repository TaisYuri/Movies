import { Text } from 'react-native';
import styled from 'styled-components/native';

export const ContentTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.base};
  font-size: 22px;
  font-weight: bold;
`;
