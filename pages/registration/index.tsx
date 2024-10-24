import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import logoIbpv from './images/logo-ibpv.png';
import 'react-toastify/dist/ReactToastify.css'; 

export default function Registration() {
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
    <div className='container'>
      <Image src={logoIbpv} alt="Logo IBPV" className='logo' />
      <div className='card'>
        <h1>{isRegister ? 'Cadastro' : 'Login'}</h1>

        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />

        <form className='form' onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input type="text" placeholder="Nome Completo" className='input' name='nome' value={formData.nome} onChange={handleChange} required />
              <input type="text" placeholder="Celular" className='input' name='celular' value={formData.celular} onChange={handleChange} required />
              <input type="text" placeholder="Ministério" className='input' name='ministerio' value={formData.ministerio} onChange={handleChange} required />
            </>
          )}
          <input type="email" placeholder="Email" className='input' name='email' value={formData.email} onChange={handleChange} required />
          <input type="password" placeholder="Senha" className='input' name='senha' value={formData.senha} onChange={handleChange} required />

          <button type="submit" className='button'> {isRegister ? 'Cadastrar' : 'Entrar'} </button>
        </form>

        <p className='switchText'>
          {isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
          <span onClick={toggleForm} className='switchLink'> {isRegister ? 'Entrar' : 'Cadastre-se'} </span>
        </p>

      </div>
    </div>
  );
}
