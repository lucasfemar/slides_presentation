// ActionDropdown.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { DropdownButton, DropdownContainer, Menu } from './styles';

interface ActionDropdownProps {
    actions: Action[];
}

interface Action {
    label: string;
    onClick: () => void;
} 

const MenuItem = styled.li`
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
        background-color: #f2f2f2; /* Cor ao passar o mouse sobre o item */
    }
`;

const ActionDropdown: React.FC<ActionDropdownProps> = ({ actions }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    return (
        <DropdownContainer>
            <DropdownButton onClick={toggleDropdown} aria-label="Actions">
                &#x22EE; {/* Três pontinhos */}
            </DropdownButton>
            {isOpen && (
                <Menu>
                    {actions.map((action, index) => (
                        <MenuItem key={index} onClick={() => { action.onClick(); closeDropdown(); }}>
                            {action.label}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </DropdownContainer>
    );
};

export default ActionDropdown;
