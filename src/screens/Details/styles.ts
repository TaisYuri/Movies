import styled from "styled-components/native";

export const Container = styled.View`
  padding-left: 10px;
  padding-right: 10px;
  background-color: #1f222a;
  /* flex: 1; */
`;

export const BoxRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const Title = styled.Text`
  color: #fff;
  margin-top: 10px;
  font-size: 25px;
  max-width: 80%;
`;
export const SubTitle = styled.Text`
  color: #fff;
  margin-left: 10px;
  font-size: 18px;
`;

export const Section = styled.View`
flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

export const BoxCard = styled.View`
  flex-direction: row;
  margin-top: 8px;
  flex-wrap: wrap;
`;

export const TextSmall = styled.Text`
  color: #fff;
  margin-top: 12px;
  font-size: 14px;
`;

export const NotFound = styled.Text`
  color: #fff;
  margin-top: 5px;
  margin-bottom: 12px;
  font-size: 14px;
`;
export const SubTitleProvider = styled.Text`
  color: #5D5D5D;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 8px;
  font-size: 18px;
`;

export const BoxProvider = styled.View`
  flex-direction: row;
  align-items: baseline;
  `;
export const ProductionCompany = styled.View`
  flex-direction: row;
  align-items: center;
  `;


export const ImageProvider = styled.Image`
  width:45px;
  height:45px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 8px;
  
  `;
export const Label = styled.Text`
color: #5D5D5D;
font-size: 15px;  
margin-top: 10px;
`;