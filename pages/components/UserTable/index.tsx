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
  nome: string;
  email: string;
  celular: string;
  ministerio: string;
  ativo: boolean;
}

interface UserTableProps {
  users: User[];
  onDeleteUser: (id: string) => void;
  onResetPassword: (email: string) => void;
  onAddUser: (newUser: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDeleteUser, onResetPassword, onAddUser }) => {

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User>({
    id: '',
    nome: '',
    email: '',
    celular: '',
    ministerio: '',
    ativo: false,
  });

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setOpenEditDialog(true);
  };

  const handleAddClick = () => {
    setNewUser({ id: '', nome: '', email: '', celular: '', ministerio: '', ativo: false });
    setOpenAddDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setEditingUser(null);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewUser({ id: '', nome: '', email: '', celular: '', ministerio: '', ativo: false });
  };

  const handleEditUser = () => {
    if (editingUser && editingUser.nome) {
      toast.success(`Usuário ${editingUser.nome} adicionado com sucesso! (FALTA IMPLEMENTAÇÃO)`);
    } else {
      toast.error('Erro: Usuário não encontrado.');
    }
  };

  const handleAddUser = async () => {
    if (newUser && newUser.nome) {
      toast.success(`Usuário ${newUser.nome} adicionado com sucesso! (FALTA IMPLEMENTAÇÃO)`);
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
      accessorKey: 'nome',
      header: 'Nome',
      enableColumnActions: false,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      enableColumnActions: false,
    },
    {
      accessorKey: 'celular',
      header: 'Celular',
      enableColumnActions: false,
    },
    {
      accessorKey: 'ministerio',
      header: 'Ministério',
      enableColumnActions: false,
    },
    {
      accessorKey: 'ativo',
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'auto', padding: '0 1%', boxSizing: 'border-box' }}>
        <MaterialReactTable
          columns={columns}
          data={users} 
          localization={MRT_Localization_PT}  
          enableColumnOrdering
          renderTopToolbarCustomActions={() => (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 2 }}>
              <CustomButton variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>Adicionar Usuário</CustomButton>
            </Box>
          )}
        />

        {/* Modal de Edição */}
        <Dialog open={openEditDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ color: "#0d62ac" }} >Editar Usuário</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            <TextField label="Nome" fullWidth margin="normal" value={editingUser?.nome || ''} onChange={(e) => handleFieldChange('nome', e.target.value)} />
            <TextField label="Email" fullWidth margin="normal" value={editingUser?.email || ''} onChange={(e) => handleFieldChange('email', e.target.value)} />
            <TextField label="Celular" fullWidth margin="normal" value={editingUser?.celular || ''} onChange={(e) => handleFieldChange('celular', e.target.value)} />
            <TextField label="Ministério" fullWidth margin="normal" value={editingUser?.ministerio || ''} onChange={(e) => handleFieldChange('ministerio', e.target.value)} />

            <Box display="flex" alignItems="center" mt={2}>
              <Typography>Ativo</Typography>
              <Switch checked={editingUser?.ativo || false} onChange={(e) => handleFieldChange('ativo', e.target.checked)} />
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

            <TextField label="Nome" fullWidth value={newUser.nome} onChange={(e) => handleFieldChange('nome', e.target.value, true)} />
            <TextField label="Email" fullWidth margin="normal" value={newUser.email} onChange={(e) => handleFieldChange('email', e.target.value, true)} />
            <TextField label="Celular" fullWidth margin="normal" value={newUser.celular} onChange={(e) => handleFieldChange('celular', e.target.value, true)} />
            <TextField label="Ministério" fullWidth margin="normal" value={newUser.ministerio} onChange={(e) => handleFieldChange('ministerio', e.target.value, true)} />

            <Box display="flex" alignItems="center" mt={2}>
              <Typography>Ativo</Typography>
              <Switch checked={newUser.ativo} onChange={(e) => handleFieldChange('ativo', e.target.checked, true)} />
            </Box>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="secondary">Cancelar</Button>
            <Button onClick={handleAddUser} sx={{ color: "#0d62ac" }}>Adicionar</Button>
          </DialogActions>
        </Dialog>

        {/* Toast Container */}
        <ToastContainer />
      </Box>
    </>
  );
};

export default UserTable;
