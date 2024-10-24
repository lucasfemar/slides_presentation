import { useState } from 'react';  

export default function registrationPage() {
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => setIsRegister(!isRegister);

  return (
    <div className='container'>
      <div className='card'>
        <h1>{isRegister ? 'Cadastro' : 'Login'}</h1>

        <form className='form'>
          {isRegister && (
            <>
              <input type="text" placeholder="Nome Completo" className='input' />
              <input type="text" placeholder="Celular" className='input' />
              <input type="text" placeholder="Ministério" className='input' />
            </>
          )}
          <input type="email" placeholder="Email" className='input' />
          <input type="password" placeholder="Senha" className='input' />

          <button type="submit" className='button'>
            {isRegister ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>

        <p className='switchText'>
          {isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
          <span onClick={toggleForm} className='switchLink'>
            {isRegister ? 'Entrar' : 'Cadastre-se'}
          </span>
        </p>
      </div>
    </div>
  );
}
