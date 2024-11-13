import styled from 'styled-components';
import Image from 'next/image';

export const FooterContainer = styled.footer`
 position: fixed;
    bottom: 0;
    width: 100%;
    height: var(--footer-height, 50px); // Variável para ajustar altura
    background-color: #333;
    color: white;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to right, #0f62ac, #8f448e); 

  display: flex;
  align-items: center;
  justify-content: center;
  
  .footer-content {
    display: flex;
    
    text-align: center;
    align-items: center;
    justify-content: center; 
    gap: 15px;

    p {      
      color: #fff;
    }

    a {
      text-decoration: none;
      color: #fff;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: #fff;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    .footer-content {
      flex-direction: column;
      gap: 10px;
    }
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