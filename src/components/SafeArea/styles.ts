import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Safe = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.background};
  height: 10px;
`;
