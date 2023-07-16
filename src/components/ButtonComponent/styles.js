import styled from 'styled-components';

export const ButtonStyles = styled.button`
    padding: 9px 50px;
    border-radius: 0.8rem;
    border: 2px solid white;
    cursor: pointer;
    width: 165px;
    height: 50px;
    font-size: 0.8rem;
    color: white;
    background-color: ${props => props.cor || "blue"};
`;
