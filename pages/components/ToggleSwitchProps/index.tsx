// ToggleSwitch.tsx
import React from 'react';
import { ToggleContainer, ToggleInput, ToggleSlider } from './styles'; // Ajuste o caminho conforme necessário

interface ToggleSwitchProps {
  active: boolean; // Altere para `active` se essa for a propriedade que você quer
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ active, onToggle }) => (
  <ToggleContainer>
    <ToggleInput type="checkbox" checked={active} onChange={onToggle} />
    <ToggleSlider />
  </ToggleContainer>
);

export default ToggleSwitch;
