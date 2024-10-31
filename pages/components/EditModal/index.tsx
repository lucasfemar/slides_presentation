// EditModal.tsx
import React from 'react';
import { User } from '../../types';
import { ModalContainer, ModalContent, Button } from './styles'; // Ajuste o caminho conforme necessário

interface EditModalProps {
    user: User; // A propriedade que representa o usuário sendo editado
    onSave: (updatedUser: User) => void;
    onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ user, onSave, onCancel }) => {
    const [name, setName] = React.useState(user.name);
    const [email, setEmail] = React.useState(user.email);
    const [phone, setPhone] = React.useState(user.phone);
    const [ministry, setMinistry] = React.useState(user.ministry);
    const [active, setActive] = React.useState(user.active);

    const handleSubmit = () => {
        onSave({ ...user, name, email, phone, ministry, active });
    };

    return (
        <ModalContainer>
            <ModalContent>
                <h2>Edit User</h2>
                <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label>Ministry:</label>
                        <input type="text" value={ministry} onChange={e => setMinistry(e.target.value)} />
                    </div>
                    <div>
                        <label>Active:</label>
                        <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} />
                    </div>
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={onCancel}>Cancel</Button>
                </form>
            </ModalContent>
        </ModalContainer>
    );
};

export default EditModal;
