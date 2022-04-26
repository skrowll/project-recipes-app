import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PASSWORD_MAX_LENGTH = 6;

export default function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const saveToken = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: state.email }));
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    setButtonDisabled(!emailRegex.test(state.email)
       || state.password.length <= PASSWORD_MAX_LENGTH);
  }, [state]);

  return (
    <form onSubmit={ saveToken }>
      <input
        data-testid="email-input"
        type="email"
        placeholder="Email"
        name="email"
        value={ state.email }
        onChange={ handleInputChange }
      />
      <input
        data-testid="password-input"
        type="password"
        placeholder="Senha"
        name="password"
        value={ state.password }
        onChange={ handleInputChange }
      />
      <Link to="/foods">
        <button
          disabled={ buttonDisabled }
          data-testid="login-submit-btn"
          type="submit"
        >
          Entrar
        </button>
      </Link>
    </form>
  );
}
