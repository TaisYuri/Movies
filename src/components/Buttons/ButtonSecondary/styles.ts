import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
    background-color: transparent;
    padding: 6px 14px;
    border-radius: 14px;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    margin-left: 10px;
    border-width: 2px;
    border-color: ${({theme}) => theme.colors.primary};   
`;

export const ButtonText = styled.Text`
    font-size: 15px;
    font-weight: 500;
    color: ${({theme}) => theme.colors.primary};
`;


