import styled from 'styled-components/native';

export const VIDEO_HEIGHT = 190;

export const Container = styled.View`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  margin-top: 50px;
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
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: bold;
`;
export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
`;

export const ViewNotFind = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TitleNotFind = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 22px;
  font-weight: bold;
  line-height: 32px;
  margin-top: 16px;
`;
export const SubtitleNotFind = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
`;