import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
 flex: 1;
 opacity: 0.7;
`;

export const Poster = styled.Image`
  width: 170px;
  height: 220px;
  border-radius: 12px; 
`;

export const Note = styled.Text`
 font-size: 12px;
 color: #fff;
`;

export const BoxNote = styled.View`
 background-color: #FF4451;
 padding: 3px 10px;
 border-radius: 8px;
 align-items: center;
 justify-content: center;
 position: absolute;
 top: 10px;
 left: 8px;
`;

export const BoxRelease = styled.View`
 background-color: #FF4451;
 padding: 3px 10px;
 border-radius: 8px;
 align-items: center;
 justify-content: center;
 margin-top: 10px;
`;