import styled from 'styled-components/native';

export const VIDEO_HEIGHT = 190;

export const Container = styled.View`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  margin-top: 70px;
  margin-left: 8px;
  margin-right: 8px;
`;
export const BoxVideo = styled.View`
  margin: 0px 16px;
`;
export const BoxLoading = styled.View`
  justify-content: center;
  align-items: center;
  display: flex;
  height: ${VIDEO_HEIGHT}px;
  width: 100%;
`;

export const ContentInfos = styled.View`
  margin: 4px 24px 24px 24px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  font-size: 18px;
  margin-top: 8px;
`;
export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  font-size: 14px;
`;

export const ViewNotFind = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TitleNotFind = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  font-size: 22px;
  font-weight: bold;
  line-height: 32px;
  margin-top: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
export const SubtitleNotFind = styled.Text`
  color: ${({ theme }) => theme.colors.base};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
