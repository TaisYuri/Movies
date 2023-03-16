import styled from 'styled-components/native';

export const ColorBackground = styled.View`
 width: 100%;
  height: 360px;
  background-color: rgba(0,0,0,0.3);
`;

export const Information = styled.View`
  position: absolute;
  bottom: 20px;
  left: 16px;
  padding-right: 25px;
`;


export const Title = styled.Text`
 font-size: 22px;
 color: ${({theme}) => theme.colors.white};
 font-weight: bold;
`;

export const Note = styled.Text`
 font-size: 13px;
 padding: 5px;
 color: ${({theme}) => theme.colors.white};
`;


export const BoxNote = styled.View`
 background-color: ${({theme}) => theme.colors.primary};
 padding: 3px 10px;
 border-radius: 8px;
 align-items: center;
 justify-content: center;
 width: 50px;
`;

export const Buttons = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;


export const ButtonPlay = styled.TouchableOpacity`
 background-color: rgb(226,18,33);
 padding: 6px 16px;
 border-radius: 14px;
 align-items: center;
 justify-content: center;
 margin-right: 16px;
 margin-left: 10px;

`;
export const ButtonList = styled.TouchableOpacity`
 background-color:transparent;
 padding: 2px 12px;
 border-radius: 14px;
 align-items: center;
 justify-content: center;
 border: 2px solid ${({theme}) => theme.colors.white};
`;

export const ButtonTitle = styled.Text`
font-size: 15px;
font-weight: 500;
color: ${({theme}) => theme.colors.white};
`;