import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { User } from "src/entities";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { MRT_Localization_PT } from "material-react-table/locales/pt";
import { useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomButton } from "src/components/UserTable/styles";

interface UserTableProps {
  users: User[];
  onResetPassword: (email: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onResetPassword }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    phone: "",
    ministery: "",
    status: false,
    password: "",
  });

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setIsEditMode(true);
    setOpenModal(true);
  };

  const handleAddClick = async (newUser: User) => {
    try {
      const userData = {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        ministery: newUser.ministery,
        status: Boolean(newUser.status),
        password: newUser.name + 123,
      };

      const response = await axios.post("/api/v1/user", userData);
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      throw error;
    }
  };

  const addUserHandler = () => {
    setNewUser({
      id: "",
      name: "",
      email: "",
      phone: "",
      ministery: "",
      status: false,
      password: "",
    });
    setIsEditMode(false);
    setOpenModal(true);
  };

  const handleCloseDialog = () => {
    setOpenModal(false);
    setEditingUser(null);
  };

  const handleEditUser = () => {
    if (editingUser && editingUser?.name) {
      toast.success(
        `Usuário ${editingUser?.name} adicionado com sucesso! (FALTA IMPLEMENTAÇÃO)`,
      );
    } else {
      toast.error("Erro: Usuário não encontrado.");
    }
  };

  const handleAddUser = async () => {
    if (newUser && newUser.name) {
      try {
        await handleAddClick(newUser);
        toast.success(`Usuário ${newUser.name} adicionado com sucesso!`);
        setOpenModal(false);
      } catch (error) {
        console.error("Erro ao adicionar usuário:", error);
        toast.error(
          "Erro ao adicionar usuário. Verifique os dados e tente novamente. ",
        );
      }
    } else {
      toast.error("Erro: Usuário não encontrado ou dados incompletos.");
    }
  };

  const handleFieldChange = (
    field: keyof User,
    value: string | boolean,
    isNewUser = false,
  ) => {
    if (isNewUser) {
      setNewUser({ ...newUser, [field]: value });
    } else if (editingUser) {
      setEditingUser({ ...editingUser, [field]: value } as User);
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    try {
      const response = await axios.delete(`/api/v1/user/${id}`);
      toast.success(`Usuário ${name} deletado com sucesso!`);
    } catch (error: unknown) {
      console.error("Erro:", error);
      if (error instanceof Error) {
        toast.error(`Erro ao tentar excluir o usuário: ${error.message}`);
      } else {
        toast.error("Erro desconhecido ao excluir o usuário");
      }
    }
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nome",
        enableColumnActions: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableColumnActions: false,
      },
      {
        accessorKey: "phone",
        header: "Celular",
        enableColumnActions: false,
      },
      {
        accessorKey: "ministery",
        header: "Ministério",
        enableColumnActions: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        enableColumnActions: false,
        Cell: ({ cell }) => {
          const isAtivo = cell.getValue<boolean>();
          return <Switch checked={isAtivo} disabled />;
        },
      },
      {
        accessorKey: "acoes",
        header: "Ações",
        enableColumnActions: false,
        Cell: ({ row }: { row: MRT_Row<User> }) => (
          <Box display="flex" alignItems="center">
            <Tooltip title="Editar Usuário">
              <IconButton
                onClick={() => handleEditClick(row.original)}
                color="primary"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Deletar">
              <IconButton
                onClick={() =>
                  handleDeleteUser(row.original.id, row.original.name)
                }
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Box
        sx={{
          overflow: "hidden", // Remove o scroll da tabela
          maxWidth: "100%", // Largura máxima da tabela, para ocupar 100% do espaço disponível
          width: "100%", // Largura 100% do container pai
          margin: "auto", // Centraliza a tabela horizontalmente

          // Definindo a altura fixa da tabela, mantendo a altura máxima sem scroll
          "& .MuiTableContainer-root": {
            maxHeight: "34rem", // Altura fixa para a tabela
            overflowY: "scroll",

            "&::-webkit-scrollbar": {
              width: "8px", // Espessura da barra de rolagem vertical
              height: "8px", // Espessura da barra de rolagem horizontal (caso aplicável)
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#8a3488", // Cor da parte que se move da barra de rolagem
              borderRadius: "4px", // Borda arredondada
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#0d62ac", // Cor quando o mouse passa por cima
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1", // Cor da trilha da barra de rolagem
            },
          },

          // Responsividade para telas pequenas (celulares) - NÃO ESTA FUNCIONANDO
          "@media (max-width: 600px)": {
            fontSize: "12px", // Ajuste do tamanho da fonte para telas menores
            padding: "8px", // Ajuste no padding para telas menores
            "& .MuiTableCell-root": {
              padding: "8px", // Ajuste do padding nas células da tabela
            },
          },

          // Responsividade para tablets e dispositivos móveis maiores - NÃO ESTA FUNCIONANDO
          "@media (min-width: 601px) and (max-width: 1024px)": {
            fontSize: "14px", // Ajuste do tamanho da fonte para tablets
            padding: "12px", // Ajuste no padding para tablets
            "& .MuiTableCell-root": {
              padding: "12px", // Ajuste no padding das células da tabela
            },
          },

          // Responsividade para desktops - NÃO ESTA FUNCIONANDO
          "@media (min-width: 1025px)": {
            fontSize: "16px", // Ajuste do tamanho da fonte para desktops
            padding: "16px", // Ajuste no padding para desktops
            "& .MuiTableCell-root": {
              padding: "16px", // Ajuste no padding das células da tabela
            },
          },
        }}
      >
        <Box
          sx={{
            padding: "0.8rem",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#0e62aa",
            backgroundColor: "#fff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          Gerenciamento de Usuários
        </Box>

        <MaterialReactTable
          enableDensityToggle={false}
          columns={columns}
          data={users}
          localization={MRT_Localization_PT}
          enableColumnOrdering
          renderTopToolbarCustomActions={() => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingBottom: 2,
              }}
            >
              <CustomButton
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addUserHandler}
              >
                Adicionar Usuário
              </CustomButton>
            </Box>
          )}
        />
      </Box>

      <Dialog
        open={openModal}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {isEditMode ? (
          <DialogTitle sx={{ color: "#0d62ac" }}>Editar Usuário</DialogTitle>
        ) : (
          <DialogTitle sx={{ color: "#0d62ac" }}>Adicionar Usuário</DialogTitle>
        )}

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={isEditMode ? editingUser?.name || "" : newUser?.name}
            onChange={(e) =>
              isEditMode
                ? handleFieldChange("name", e.target.value)
                : handleFieldChange("name", e.target.value, true)
            }
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={isEditMode ? editingUser?.email || "" : newUser?.email}
            onChange={(e) =>
              isEditMode
                ? handleFieldChange("email", e.target.value)
                : handleFieldChange("email", e.target.value, true)
            }
          />

          <TextField
            label="Celular"
            fullWidth
            margin="normal"
            value={isEditMode ? editingUser?.phone || "" : newUser?.phone}
            onChange={(e) =>
              isEditMode
                ? handleFieldChange("phone", e.target.value)
                : handleFieldChange("phone", e.target.value, true)
            }
          />

          <TextField
            label="Ministério"
            fullWidth
            margin="normal"
            value={
              isEditMode ? editingUser?.ministery || "" : newUser?.ministery
            }
            onChange={(e) =>
              isEditMode
                ? handleFieldChange("ministery", e.target.value)
                : handleFieldChange("ministery", e.target.value, true)
            }
          />

          <Box display="flex" alignItems="center" mt={2}>
            <Typography>Ativo</Typography>
            <Switch
              checked={
                isEditMode ? editingUser?.status || false : newUser?.status
              }
              onChange={(e) =>
                isEditMode
                  ? handleFieldChange("status", e.target.checked)
                  : handleFieldChange("status", e.target.checked, true)
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>

          {isEditMode ? (
            <Button onClick={handleEditUser} sx={{ color: "#0d62ac" }}>
              Salvar
            </Button>
          ) : (
            <Button onClick={handleAddUser} sx={{ color: "#0d62ac" }}>
              Adicionar
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default UserTable;