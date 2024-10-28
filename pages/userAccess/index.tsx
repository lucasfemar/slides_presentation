import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; 
import logoIbpv from '../public/logo-ibpv.png';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Logo,
  Card,
  Form,
  Input,
  Button,
  SwitchText,
  SwitchLink,
} from './styles';  

export default function UserAccess() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    nome:       '',
    celular:    '',
    ministerio: '',
    email:      '',
    senha:      '',
  });

  const toggleForm = () => setIsRegister(prev => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    try {
      const response = await fetch('/api/DATABASE_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados');
      }

      const result = await response.json();
      toast.success('Dados enviados com sucesso!');
      console.log('Dados enviados com sucesso:', result);

      setFormData({
        nome:       '',
        celular:    '',
        ministerio: '',
        email:      '',
        senha:      '',
      });

    } catch (error) {
      console.error('Erro:', error);
      toast.error('Houve um problema ao enviar os dados. Tente novamente.');
    }
  };

  return (
    <Container>
      <Logo src={logoIbpv} alt="Logo IBPV" />
      <Card>
        <h1>{isRegister ? 'Cadastro' : 'Login'}</h1>

        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />

        <Form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <Input type="text" placeholder="Nome Completo" name='nome' value={formData.nome} onChange={handleChange} required />
              <Input type="text" placeholder="Celular" name='celular' value={formData.celular} onChange={handleChange} required />
              <Input type="text" placeholder="Ministério" name='ministerio' value={formData.ministerio} onChange={handleChange} required />
            </>
          )}
          <Input type="email" placeholder="Email" name='email' value={formData.email} onChange={handleChange} required />
          <Input type="password" placeholder="Senha" name='senha' value={formData.senha} onChange={handleChange} required />

          <Button type="submit">{isRegister ? 'Cadastrar' : 'Entrar'}</Button>
        </Form>

        <SwitchText>
          {isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
          <SwitchLink onClick={toggleForm}>{isRegister ? 'Entrar' : 'Cadastre-se'}</SwitchLink>
        </SwitchText>
      </Card>
    </Container>
  );
}
