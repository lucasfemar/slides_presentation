// styles.ts
import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 1rem;
    color: #333;

    th, td {
        border: 1px solid #ddd;
        padding: 12px;
    }

    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

export const ActionButton = styled.button`
    padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`; 
