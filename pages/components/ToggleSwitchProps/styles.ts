// styles.ts
import styled from 'styled-components';

export const ToggleContainer = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const ToggleInput = styled.input`
    display: none; /* Esconde o checkbox padrão */
`;

export const ToggleSlider = styled.span`
    position: relative;
    width: 50px; /* Largura do switch */
    height: 24px; /* Altura do switch */
    background-color: #ccc; /* Cor de fundo padrão */
    border-radius: 24px; /* Bordas arredondadas */
    transition: background-color 0.2s; /* Transição suave da cor de fundo */

    &::before {
        content: '';
        position: absolute;
        width: 20px; /* Largura do círculo do toggle */
        height: 20px; /* Altura do círculo do toggle */
        background-color: white; /* Cor do círculo */
        border-radius: 50%; /* Círculo perfeito */
        left: 2px; /* Posição inicial do círculo */
        bottom: 2px; /* Posição inicial do círculo */
        transition: transform 0.2s; /* Transição suave do círculo */
    }

    /* Mudança de estilo quando o toggle está ativo */
    ${ToggleInput}:checked + & {
        background-color: #4CAF50; /* Cor de fundo quando ativo */
    }

    ${ToggleInput}:checked + &::before {
        transform: translateX(26px); /* Move o círculo para a direita */
    }
`;
