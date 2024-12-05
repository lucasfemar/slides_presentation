import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import logoIbpv from "../public/logo-ibpv.png";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Logo,
  Card,
  Form,
  Input,
  Button,
  SwitchText,
  SwitchLink,
  Title,
} from "./styles";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    ministery: "",
    email: "",
    password: "",
    status: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    try {
      const response = await axios.post("/api/v1/user/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Dados enviados com sucesso!");
        console.log("Dados enviados com sucesso:", response.data);

        setFormData({
          name: "",
          phone: "",
          ministery: "",
          email: "",
          password: "",
          status: false,
        });
      } else {
        throw new Error("Erro ao enviar os dados");
      }
    } catch (error: unknown) {
      console.error("Erro:", error);

      if (error instanceof Error) {
        const backendErrorMessage =
          (error as any).response?.data?.message ||
          "Houve um problema ao enviar os dados. Tente novamente.";
        toast.error(backendErrorMessage);
      } else {
        toast.error("Erro desconhecido.");
      }
    }
  };

  return (
    <Container>
      <Logo src={logoIbpv} alt="Logo IBPV" />
      <Card>
        <Title>Cadastro</Title>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
        />

        <Form onSubmit={handleSubmit}>
          <>
            <Input
              type="text"
              placeholder="Nome Completo"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              placeholder="Celular"
              name="phone"
              value={formData?.phone}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              placeholder="Ministério"
              name="ministery"
              value={formData?.ministery}
              onChange={handleChange}
              required
            />
          </>

          <Button type="submit">Cadastrar</Button>
        </Form>

        <SwitchText>
          Já tem uma conta?{" "}
          <SwitchLink onClick={() => router.push("/login")}>Entrar</SwitchLink>
        </SwitchText>
      </Card>
    </Container>
  );
}
