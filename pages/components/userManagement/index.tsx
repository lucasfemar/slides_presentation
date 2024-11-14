import React, { useState, useEffect } from 'react';
import UserTable from '../UserTable'; 
import { User } from '../../types'; 
import { FormContainer } from '../userManagement/styles'
 
interface UserManagementProps {
    initialUsers: User[];
}

const UserManagement: React.FC<UserManagementProps> = ({ initialUsers }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setUsers(initialUsers);
    }, [initialUsers]);
 
    const handleSaveUser = (updatedUser: User) => {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        setEditingUser(null);
    };

    const handleResetPassword = (email: string) => {
        console.log(`Enviando email de redefinição de senha para ${email}`);
    }; 

    const filteredUsers = users.filter(user => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(lowerCaseTerm) ||
            user.email.toLowerCase().includes(lowerCaseTerm) ||
            user.ministery.toLowerCase().includes(lowerCaseTerm)
        );
    });

    return (
        <FormContainer>
            <UserTable
                users={filteredUsers} 
                onResetPassword={handleResetPassword}
            />
        </FormContainer>
    );
};

export default UserManagement;
