import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoIbpv from "public/images/logos/logo-ibpv.png";
import {
  Button,
  Card,
  Container,
  Form,
  Input,
  Logo,
  SwitchLink,
  SwitchText,
  Title,
} from "src/components/sharedstyle";
import { useRouter } from "next/router";

export default function Login() {
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
      const response = await axios.post("/api/v1/login/", formData, {
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
        <Title>Login</Title>
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
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit">Entrar</Button>
        </Form>
        <SwitchText>
          Não tem uma conta?{" "}
          <SwitchLink onClick={() => router.push("/register")}>
            Cadastre-se
          </SwitchLink>
        </SwitchText>{" "}
      </Card>
    </Container>
  );
}