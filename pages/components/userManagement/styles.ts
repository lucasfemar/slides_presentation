// styles.ts
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* Centraliza o conteúdo */
    padding: 2% 5%; /* Usando porcentagem para responsividade */
    width: 100%; /* Permite que o container ocupe toda a largura */
    max-width: 1200px; /* Limite máximo de largura para telas grandes */
    margin: 0 auto; /* Centraliza o container em telas grandes */

    h1 {
        font-size: 3rem; /* Tamanho do título para telas grandes */
        color: #333; /* Cor do texto */
        margin-bottom: 20px; /* Espaçamento abaixo do título */
        text-align: center; /* Centraliza o texto */
        width: 100%; /* Para garantir que ocupe toda a largura */
    }

    @media (max-width: 600px) {
        h1 {
            font-size: 2rem; /* Tamanho do título para telas pequenas */
        }
    }

    @media (min-width: 1200px) {
        h1 {
            font-size: 4rem; /* Tamanho do título para telas extra grandes */
        }
    }
`;

export const TableWrapper = styled.div`
    width: 100%; /* A tabela ocupa 100% do seu container */
    overflow-x: auto; /* Permite rolagem horizontal em telas pequenas */
    margin-top: 20px; /* Espaçamento acima da tabela */
`;

export const ShadowTable = styled.div`
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Sombra da tabela */
    border-radius: 8px; /* Borda arredondada */
    overflow: hidden; /* Esconde bordas de conteúdo que saem do container */
    background: white; /* Fundo branco para contraste */
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 1.2rem; /* Tamanho da fonte padrão */
    color: #333;

    th, td {
        border: 1px solid #ddd;
        padding: 16px; /* Usando um pouco mais de espaço para maior conforto */
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }

    @media (max-width: 600px) {
        font-size: 1rem; /* Tamanho da fonte para telas pequenas */
    }

    @media (min-width: 1200px) {
        font-size: 1.5rem; /* Tamanho da fonte para telas grandes */
    }
`;
