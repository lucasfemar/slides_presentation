import styled from 'styled-components';
import Image from 'next/image';

/* === Header Principal === */
export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 10px 15px;
  }
`;


/* === Logo === */
export const Logo = styled(Image)`
  width: 120px;
  height: auto; 

  @media (min-width: 768px) {
    width: 150px;
  }
`;

/* === Container dos Links e Botão === */
export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
  }
`;

/* === Navegação === */
export const Nav = styled.nav`
  display: flex;
  gap: 15px; 

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
  }
`;

/* === Links de Navegação === */
export const NavLink = styled.a`
  position: relative;
  text-decoration: none;
  color: #007bff;
  font-size: 16px;
  font-weight: 500;
  display: inline-block;
  padding-bottom: 5px;

  /* Suaviza a mudança de cor */
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3; /* Muda a cor ao passar o mouse */
  }

  /* Linha inicial escondida abaixo do link */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: #8a3488;
    transition: width 0.8s ease; /* Controle da animação da linha */
  }

  /* Quando o mouse estiver sobre o link */
  &:hover::after {
    width: 100%; /* Linha cresce de 0% a 100% da esquerda para direita */
  }
`;

 