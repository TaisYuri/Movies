import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding-bottom: 40px;
`;
export const ContainerItem = styled.TouchableOpacity`
  border-bottom-width: 0.6px;
  border-bottom-color: ${({ theme }) => theme.colors.base_alternative};
  border-top-width: 1px;
  border-right-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.base_alternative};
  border-right-color: ${({ theme }) => theme.colors.base_alternative};
  border-left-width: 7px;
  border-left-color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  /* height: 80px; */
  justify-content: center;
  padding-right: 8px;
  elevation: 5;
  margin: 10px 20px;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Space = styled.View`
  height: 70px;
  width: 100%;
`;
export const Poster = styled.Image`
  width: 80px;
  height: 100px;
  border-radius: 8px;
`;

export const ContentHidden = styled.View`
  flex-direction: row;
  margin: 0 20px;
`;
export const ContentHiddenLoading = styled.View`
  flex-direction: row;
  margin: 10px 20px;
  align-items: center;
  justify-content: flex-end;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-right: 16px;
  border-radius: 10px;
`;

export const ButtonRight = styled.TouchableOpacity`
  margin: 10px 0;
  align-items: flex-end;
  flex: 1;
  justify-content: center;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  padding-right: 16px;
`;
