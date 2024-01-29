import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../index.css';

const NavBar = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  const logOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="navBar">
      {' '}
      <Link to="/">blogs</Link> <Link to="/">users</Link>{' '}
      <div>{user.username} logged in</div>
      <button onClick={logOut}>logout</button>
    </div>
  );
};

export default NavBar;
