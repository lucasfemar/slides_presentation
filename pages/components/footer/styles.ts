import styled from 'styled-components';

export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--footer-height);
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.colors.footerBackground};
  box-shadow: 0 -8px 16px ${({ theme }) => theme.colors.footerShadow};
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
  
  .footer-content {
    display: flex;
    align-items: center;
    justify-content: center; 
    gap: 15px;

    p {      
      color: ${({ theme }) => theme.colors.titleColor};
    }

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.linkColor};
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.primaryHover};
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
