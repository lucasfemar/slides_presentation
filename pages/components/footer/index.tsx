// src/components/Footer.tsx
import React from 'react';  
import { FooterContainer } from '../footer/styles';  

const Footer: React.FC = () => {
  return (
    <FooterContainer>  
      <div className="footer-content">
        <p>© 2024 Instituto Pedra Vida</p> 
      </div>
    </FooterContainer>
  );
};

export default Footer;
