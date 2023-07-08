import styled from 'styled-components/native';

interface sized {
  size: 'xl' | 'md';
}

export const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const Poster = styled.Image<sized>`
  width: ${(props) => (props.size === 'xl' ? '110' : '80')}px;
  height: ${(props) => (props.size === 'xl' ? '110' : '80')}px;
  border-radius: 100px;
`;

export const Note = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.base};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const BoxRelease = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-top: 8px;
  margin-left: 8px;
  max-width: 120px;
`;
