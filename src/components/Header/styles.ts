import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Container = styled(LinearGradient)`
  width: 100%;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
  position: absolute;
  z-index: 1;
`;

export const ContentTitle = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
`;
