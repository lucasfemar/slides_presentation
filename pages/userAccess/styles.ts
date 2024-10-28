// src/styles.ts

import styled from 'styled-components';
import Image from 'next/image';

// Definição de cores globais
const colors = {
  background: '#f7f7f7',
  cardBackground: 'white',
  borderColor: '#ccc',
  primary: '#8a3489',
  primaryHover: '#0056b3',
  focusColor: '#007bff',
  linkColor: '#007bff',
  textColor: 'black', // Adicione esta cor caso queira usar para textos
};

// Container principal da aplicação
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; /* Alinhamento inicial para permitir rolagem */
  padding: 20px;
  background-color: ${colors.background};
  min-height: 90vh; 
  max-height: 100vh; /* Limita a altura ao tamanho da tela */ 

  /* Estilos responsivos */
  @media (max-width: 600px) { /* Para dispositivos móveis */
    padding: 10px;
  }

  @media (min-width: 601px) and (max-width: 1200px) { /* Para tablets e laptops */
    padding: 15px;
  }

  @media (min-width: 1201px) { /* Para monitores widescreen, 4K e 8K */
    padding: 40px; /* Aumenta o padding em telas grandes */
  }
`;

// Logo da aplicação
export const Logo = styled(Image)`
  width: 150px; /* Ajusta a largura da logo para dispositivos móveis */
  height: auto;
  margin-bottom: 20px;

  @media (min-width: 601px) {
    width: 200px; /* Para tablets e maiores */
  }

  @media (min-width: 1201px) {
    width: 250px; /* Para telas grandes */
  }
`;

// Cartão para o formulário
export const Card = styled.div`
  background-color: ${colors.cardBackground};
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Sombra aplicada */
  padding: 20px;
  width: 100%;
  max-width: 400px;
  text-align: center;

  @media (min-width: 1201px) {
    max-width: 600px; 
  }
`;

// Formulário estilizado
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Input do formulário
export const Input = styled.input`
  padding: 10px;
  border: 1px solid ${colors.borderColor};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;

  &:focus {
    border-color: ${colors.focusColor};
    outline: none;
  }

  @media (max-width: 600px) {
    font-size: 14px;  
  }
`;

// Botão estilizado
export const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: ${colors.primary};
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.primaryHover};
  }

  @media (max-width: 600px) {
    font-size: 14px;  
  }
`;

// Texto para alternar entre cadastro e login
export const SwitchText = styled.p`
  margin-top: 10px;

  @media (max-width: 600px) {
    font-size: 14px; 
  }
`;

// Link para alternar entre cadastro e login
export const SwitchLink = styled.span`
  color: ${colors.linkColor};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    font-size: 14px;  
  }
`;
