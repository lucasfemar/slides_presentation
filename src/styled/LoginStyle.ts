// src/components/UserConfig/styles.ts
import styled from "styled-components";
import Image from "next/image";

// Título estilizado
export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.titleColor};
`;

// Container principal da aplicação
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Ocupa toda a altura da tela */
  padding: 20px; /* Padding padrão para espaçamento interno */
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 10px;
  }

  @media (min-width: 601px) and (max-width: 1200px) {
    padding: 15px;
  }

  @media (min-width: 1201px) {
    padding: 40px;
  }
`;

// Logo da aplicação
export const Logo = styled(Image)`
  width: 150px;
  height: auto;
  margin-bottom: 20px;

  @media (min-width: 601px) {
    width: 200px;
  }

  @media (min-width: 1201px) {
    width: 250px;
  }
`;

// Cartão do formulário
export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.focusColor};
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
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
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
  color: ${({ theme }) => theme.colors.linkColor};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
