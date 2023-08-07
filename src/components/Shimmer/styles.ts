import styled from 'styled-components/native';
import { IShimmer } from './types';

export const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const ContentShimmerPerson = styled.View<IShimmer>`
  width: ${(props) => (props.size === 'xl' ? '110' : '80')}px;
  height: ${(props) => (props.size === 'xl' ? '110' : '80')}px;
  border-radius: 100px;
  background-color: #c2c2c2;
  overflow: hidden;
`;
export const ContentShimmerMovie = styled.View<IShimmer>`
  width: ${(props) => (props.size === 'xl' ? '170' : '80')}px;
  height: ${(props) => (props.size === 'xl' ? '220' : '80')}px;
  border-radius: 12px;
  background-color: #c2c2c2;
  overflow: hidden;
`;
