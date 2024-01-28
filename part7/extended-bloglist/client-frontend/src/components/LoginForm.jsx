import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import { activeUser } from '../reducers/userReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeUser());
  }, [dispatch]);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(login({ username, password }));

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
