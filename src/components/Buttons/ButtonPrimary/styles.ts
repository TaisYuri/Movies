import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
    background-color: rgb(226, 18, 33);
    padding: 6px 16px;
    border-radius: 14px;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    margin-left: 10px;
`;

export const ButtonText = styled.Text`
    font-size: 15px;
    font-weight: 500;
    color: ${({theme}) => theme.colors.white};
`;