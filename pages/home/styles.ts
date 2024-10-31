import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - var(--header-height) - var(--footer-height));
    padding: 0px; /* opcional, adiciona um espaçamento */
    box-sizing: border-box;
`