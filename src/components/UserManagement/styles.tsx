import styled from "styled-components";

export const FormContainer = styled.div` 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    margin: 1% 0; 
    padding: 0 10%; 
    text-align: center; 
    width: 100%; 
    max-width: 100%; 
    height: auto; /* Ajuste a altura automática */ 
    max-height: 100vh; /* Limite a altura máxima para 90% da altura da janela de visualização */ 
    box-sizing: border-box; overflow-y: auto; /* Permitir rolagem vertical, se necessário */ 
`