import { useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_Row } from 'material-react-table';
import { IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box, Typography, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { CustomButton } from '../UserTable/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MRT_Localization_PT } from 'material-react-table/locales/pt';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  ministery: string;
  status: boolean;
}

interface UserTableProps {
  users: User[];
  onDeleteUser: (id: string) => void;
  onResetPassword: (email: string) => void;
  onAddUser: (newUser: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDeleteUser, onResetPassword, onAddUser }) => {

  users = [
    { id: '1234', name: 'Elton', email: 'elton@gmail.com', phone: '1198234586', ministery: 'Rede Teens', status: false },
    { id: '1235', name: 'Ana', email: 'ana@gmail.com', phone: '1198765432', ministery: 'Rede Jovem', status: true },
    { id: '1236', name: 'Carlos', email: 'carlos@gmail.com', phone: '1198123456', ministery: 'Louvor', status: true },
    { id: '1237', name: 'Fernanda', email: 'fernanda@gmail.com', phone: '1198345678', ministery: 'Crianças', status: false },
    { id: '1238', name: 'Lucas', email: 'lucas@gmail.com', phone: '1198456789', ministery: 'Missões', status: true },
    { id: '1239', name: 'Mariana', email: 'mariana@gmail.com', phone: '1198567890', ministery: 'Intercessão', status: true },
    { id: '1240', name: 'Pedro', email: 'pedro@gmail.com', phone: '1198678901', ministery: 'Evangelismo', status: false },
    { id: '1241', name: 'Juliana', email: 'juliana@gmail.com', phone: '1198789012', ministery: 'Rede Mulheres', status: true },
    { id: '1242', name: 'Rafael', email: 'rafael@gmail.com', phone: '1198890123', ministery: 'Rede Jovem', status: false },
    { id: '1243', name: 'Patrícia', email: 'patricia@gmail.com', phone: '1198901234', ministery: 'Louvor', status: true },
    { id: '1244', name: 'Tiago', email: 'tiago@gmail.com', phone: '1199012345', ministery: 'Crianças', status: false },
    { id: '1245', name: 'Beatriz', email: 'beatriz@gmail.com', phone: '1199123456', ministery: 'Rede Jovem', status: true },
    { id: '1246', name: 'Rodrigo', email: 'rodrigo@gmail.com', phone: '1199234567', ministery: 'Intercessão', status: true },
    { id: '1247', name: 'Renata', email: 'renata@gmail.com', phone: '1199345678', ministery: 'Rede Mulheres', status: false },
    { id: '1248', name: 'Leonardo', email: 'leonardo@gmail.com', phone: '1199456789', ministery: 'Evangelismo', status: true },
    { id: '1249', name: 'Larissa', email: 'larissa@gmail.com', phone: '1199567890', ministery: 'Rede Jovem', status: true }];

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    phone: '',
    ministery: '',
    status: false,
  });

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setOpenEditDialog(true);
  };

  const handleAddClick = () => {
    setNewUser({ id: '', name: '', email: '', phone: '', ministery: '', status: false });
    setOpenAddDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setEditingUser(null);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewUser({ id: '', name: '', email: '', phone: '', ministery: '', status: false });
  };

  const handleEditUser = () => {
    if (editingUser && editingUser.name) {
      toast.success(`Usuário ${editingUser.name} adicionado com sucesso! (FALTA IMPLEMENTAÇÃO)`);
    } else {
      toast.error('Erro: Usuário não encontrado.');
    }
  };

  const handleAddUser = async () => {
    if (newUser && newUser.name) {
      toast.success(`Usuário ${newUser.name} adicionado com sucesso! (FALTA IMPLEMENTAÇÃO)`);
    } else {
      toast.error('Erro: Usuário não encontrado.');
    }
  };

  const handleFieldChange = (field: keyof User, value: string | boolean, isNewUser = false) => {
    if (isNewUser) {
      setNewUser({ ...newUser, [field]: value });
    } else if (editingUser) {
      setEditingUser({ ...editingUser, [field]: value } as User);
    }
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Nome',
      enableColumnActions: false,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      enableColumnActions: false,
    },
    {
      accessorKey: 'phone',
      header: 'Celular',
      enableColumnActions: false,
    },
    {
      accessorKey: 'ministery',
      header: 'Ministério',
      enableColumnActions: false,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      enableColumnActions: false,
      Cell: ({ cell }) => {
        const isAtivo = cell.getValue<boolean>();
        return <Switch checked={isAtivo} disabled />;
      },
    },
    {
      accessorKey: 'acoes',
      header: 'Ações',
      enableColumnActions: false,
      Cell: ({ row }: { row: MRT_Row<User> }) => (
        <Box display="flex" alignItems="center">
          <Tooltip title="Editar Usuário">
            <IconButton onClick={() => handleEditClick(row.original)} color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar">
            <IconButton onClick={() => onDeleteUser(row.original.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ], [onDeleteUser]);

  return (
    <>
      <Box
        sx={{
          overflow: 'hidden',         // Remove o scroll da tabela
          maxWidth: '100%',           // Largura máxima da tabela, para ocupar 100% do espaço disponível
          width: '100%',              // Largura 100% do container pai
          margin: 'auto',             // Centraliza a tabela horizontalmente

          // Definindo a altura fixa da tabela, mantendo a altura máxima sem scroll
          '& .MuiTableContainer-root': {
            maxHeight: '34rem',       // Altura fixa para a tabela
            overflowY: 'hidden',      // Remove a rolagem vertical
          },

          // Responsividade para telas pequenas (celulares) - NÃO ESTA FUNCIONANDO
          '@media (max-width: 600px)': {
            fontSize: '12px',         // Ajuste do tamanho da fonte para telas menores
            padding: '8px',           // Ajuste no padding para telas menores
            '& .MuiTableCell-root': {
              padding: '8px',         // Ajuste do padding nas células da tabela
            },
          },

          // Responsividade para tablets e dispositivos móveis maiores - NÃO ESTA FUNCIONANDO
          '@media (min-width: 601px) and (max-width: 1024px)': {
            fontSize: '14px',         // Ajuste do tamanho da fonte para tablets
            padding: '12px',          // Ajuste no padding para tablets
            '& .MuiTableCell-root': {
              padding: '12px',        // Ajuste no padding das células da tabela
            },
          },

          // Responsividade para desktops - NÃO ESTA FUNCIONANDO
          '@media (min-width: 1025px)': {
            fontSize: '16px',         // Ajuste do tamanho da fonte para desktops
            padding: '16px',          // Ajuste no padding para desktops
            '& .MuiTableCell-root': {
              padding: '16px',        // Ajuste no padding das células da tabela
            },
          },
        }}

      >
        <Box sx={{
          padding: '0.8rem',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: '#0e62aa',
          backgroundColor: '#fff',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}>
          Gerenciamento de Usuários
        </Box>
        <MaterialReactTable
          columns={columns}
          data={users}
          localization={MRT_Localization_PT}
          enableColumnOrdering
          renderTopToolbarCustomActions={() => (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 2 }}>
              <CustomButton variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => { /* handleAddClick logic */ }}>Adicionar Usuário</CustomButton>
            </Box>
          )}
        />
      </Box>

      {/* Modal de Edição */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: "#0d62ac" }} >Editar Usuário</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

          <TextField label="Nome" fullWidth margin="normal" value={editingUser?.name || ''} onChange={(e) => handleFieldChange('name', e.target.value)} />
          <TextField label="Email" fullWidth margin="normal" value={editingUser?.email || ''} onChange={(e) => handleFieldChange('email', e.target.value)} />
          <TextField label="Celular" fullWidth margin="normal" value={editingUser?.phone || ''} onChange={(e) => handleFieldChange('phone', e.target.value)} />
          <TextField label="Ministério" fullWidth margin="normal" value={editingUser?.ministery || ''} onChange={(e) => handleFieldChange('ministery', e.target.value)} />

          <Box display="flex" alignItems="center" mt={2}>
            <Typography>Ativo</Typography>
            <Switch checked={editingUser?.status || false} onChange={(e) => handleFieldChange('status', e.target.checked)} />
          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleEditUser} sx={{ color: "#0d62ac" }}>Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Adição */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: "#0d62ac" }}>Adicionar Usuário</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

          <TextField label="name" fullWidth value={newUser.name} onChange={(e) => handleFieldChange('name', e.target.value, true)} />
          <TextField label="Email" fullWidth margin="normal" value={newUser.email} onChange={(e) => handleFieldChange('email', e.target.value, true)} />
          <TextField label="phone" fullWidth margin="normal" value={newUser.phone} onChange={(e) => handleFieldChange('phone', e.target.value, true)} />
          <TextField label="Ministério" fullWidth margin="normal" value={newUser.ministery} onChange={(e) => handleFieldChange('ministery', e.target.value, true)} />

          <Box display="flex" alignItems="center" mt={2}>
            <Typography>status</Typography>
            <Switch checked={newUser.status} onChange={(e) => handleFieldChange('status', e.target.checked, true)} />
          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleAddUser} sx={{ color: "#0d62ac" }}>Adicionar</Button>
        </DialogActions>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default UserTable;
