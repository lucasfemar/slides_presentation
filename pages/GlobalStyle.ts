// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  /* global.css ou styles.css */
  :root {
    --header-height: 100px; /* Defina aqui a altura do Header */
    --footer-height: 15vh; /* ou outra altura desejada para o Footer */
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    overflow-x: hidden;
  }
`;