import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const Poster = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 100px;
`;

export const Note = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
`;

export const BoxRelease = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-top: 8px;
  margin-left: 8px;
  max-width: 120px;
`;
