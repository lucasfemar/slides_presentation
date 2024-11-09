import styled from 'styled-components';
import Image from 'next/image';

/* === Header Principal === */
export const HeaderContainer = styled.header`
  width: 100%;
  height: 3vw; /* Variável para ajustar altura */
  background-color: #fff;
  color: #0e62aa;
  display: flex;
  align-items: center;
  justify-content: center; /* Alinha os itens à esquerda */
  padding: 0 20px; /* Adiciona espaço nas laterais */
  position: relative;

  h1 {
    margin: 35rem; /* Ajusta o espaço para manter o texto próximo à esquerda */
    text-align: center;
    flex: 1; /* Impede que o <h1> cresça automaticamente */
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 10px 15px;
  }
`;

/* === Logo === */
export const Logo = styled(Image)`
  margin-right: 20px; /* Alinha o logo à esquerda */
  width: 180px;
  height: auto;

  @media (min-width: 768px) {
    width: 200px;
  }
`;

