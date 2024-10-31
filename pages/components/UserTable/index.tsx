// UserTable.tsx
import React from 'react';
import { Table, TableRow } from './styles'; // Certifique-se de que o caminho está correto
import ToggleSwitch from '../ToggleSwitchProps/index'; // Ajuste o caminho conforme necessário
import { User } from '../../types';
import ActionDropdown from '../ActionDropdown'; // Importação do componente ActionDropdown

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onToggleActive: (id: number) => void;
  onResetPassword: (email: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onToggleActive, onResetPassword }) => (
  <Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Ministry</th>
        <th>Active</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => {
        // Define as ações que serão passadas para o ActionDropdown
        const actions = [
          { label: 'Edit', onClick: () => onEdit(user) },
          { label: 'Reset Password', onClick: () => onResetPassword(user.email) },
        ];

        return (
          <TableRow key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.ministry}</td>
            <td>
              <ToggleSwitch 
                active={user.active} // Altere para `active`
                onToggle={() => onToggleActive(user.id)} 
              />
            </td>
            <td>
              <ActionDropdown actions={actions} />  
            </td>
          </TableRow>
        );
      })}
    </tbody>
  </Table>
);

export default UserTable;
