// UserManagement.tsx
import React, { useState } from 'react';
import UserTable from '../UserTable';
import EditModal from '../EditModal';
import { User } from '../../types'; // Importação correta
import { Container, TableWrapper, ShadowTable } from './styles'; // Importando estilos

const initialUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(11) 99999-9999', ministry: 'Administração', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(11) 88888-8888', ministry: 'Evangelismo', active: false },
];

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleEditUser = (user: User) => setEditingUser(user);

    const handleSaveUser = (updatedUser: User) => {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        setEditingUser(null);
    };

    const handleToggleActive = (id: number) => {
        setUsers(users.map(user => (user.id === id ? { ...user, active: !user.active } : user)));
    };

    const handleResetPassword = (email: string) => {
        console.log(`Enviando email de redefinição de senha para ${email}`);
    };

    return (
        <Container>
            <h1>Gerenciamento de Usuários</h1>
            <TableWrapper>
                <ShadowTable>
                    <UserTable
                        users={users}
                        onEdit={handleEditUser}
                        onToggleActive={handleToggleActive}
                        onResetPassword={handleResetPassword}
                    />
                </ShadowTable>
            </TableWrapper>
            {editingUser && (
                <EditModal 
                    user={editingUser} 
                    onSave={handleSaveUser} 
                    onCancel={() => setEditingUser(null)} 
                />
            )}
        </Container>
    );
};

export default UserManagement;
