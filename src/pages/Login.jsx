import React, { useEffect, useState } from 'react';

const PASSWORD_MAX_LENGTH = 6;

export default function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

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
    <form>
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
      <button
        disabled={ buttonDisabled }
        data-testid="login-submit-btn"
        type="submit"
      >
        Entrar

      </button>
    </form>
  );
}
