// src/components/Header.tsx
import React from 'react'; 
// import Image from 'next/image';
import { HeaderContainer, Logo, Nav, NavLink } from '../header/styles';
import logoIbpv from '../../public/logo-ibpv.png'

const Header: React.FC = () => {
  return (
    <HeaderContainer> 
      <Logo src={logoIbpv} alt="Logo IBPV" />
      <Nav>
        <NavLink href="/home">Home</NavLink>
        <NavLink href="/sobre">Menu 1</NavLink>
        <NavLink href="/servicos">Menu 2</NavLink>
        <NavLink href="/contato">Menu 3</NavLink>
      </Nav> 
    </HeaderContainer>
  );
};

export default Header;
