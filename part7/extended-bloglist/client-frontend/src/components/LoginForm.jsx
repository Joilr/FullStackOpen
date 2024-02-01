import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import { activeUser } from '../reducers/userReducer';
import '../output.css';

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
    <div className="m-6 p-4 max-w-sm  bg-white shadow-lg rounded-lg">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          Username
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          Password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          id="login-button"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
