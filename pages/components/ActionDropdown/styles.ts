import styled from 'styled-components';

export const DropdownContainer = styled.div`
    position: relative;
`;

export const DropdownButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px; /* Tamanho do ícone */
    color: #0070d2; /* Cor padrão do Salesforce */

    &:hover {
        color: #0056a0; /* Cor ao passar o mouse */
    }
`;

export const Menu = styled.ul`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 1;
`;