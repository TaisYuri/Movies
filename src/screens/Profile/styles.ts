import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 50px 16px 0 16px;
`;
export const ContentSwitch = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  gap: 8px;
`;

export const NavMenu = styled.View`
  margin-top: 40px;
`;
export const Diviser = styled.View`
  background-color: ${({ theme }) => theme.colors.base_alternative};
  width: 30%;
  height: 1px;
`;
export const ItemMenu = styled.TouchableOpacity`
  margin: 16px 0;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
export const ItemText = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
`;
