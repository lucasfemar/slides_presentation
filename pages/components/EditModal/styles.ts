// styles.ts
import styled from 'styled-components';

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Certifique-se de que o modal esteja acima de outros elementos */
`;

export const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px; /* Borda arredondada */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Sombra */
    width: 400px; /* Largura fixa do modal */
    max-width: 90%; /* Largura máxima para dispositivos menores */
`;

export const Button = styled.button`
    background-color: #007bff; /* Cor do botão (azul) */
    color: white; /* Cor do texto do botão */
    border: none; /* Sem borda */
    padding: 10px 15px; /* Espaçamento interno */
    border-radius: 5px; /* Bordas arredondadas */
    cursor: pointer; /* Cursor de ponteiro ao passar o mouse */
    margin-top: 10px; /* Espaçamento acima do botão */
    transition: background-color 0.3s; /* Transição suave para a cor de fundo */

    &:hover {
        background-color: #0056b3; /* Cor ao passar o mouse */
    }

    &:first-child {
        margin-right: 10px; /* Espaçamento entre os botões */
    }
`;
