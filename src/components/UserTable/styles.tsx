import styled from "styled-components";
import { Button } from "@mui/material";

export const CustomButton = styled(Button)`
  background-color: #8a3488; // Cor padrão
  &:hover {
    background-color: #0d62ac; // Cor quando o botão é hover
  }
`;
