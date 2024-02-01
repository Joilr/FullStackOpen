import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../input.css';

const NavBar = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  const logOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="navBar bg-gray-700 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="hover:text-blue-300 mr-2">
          Blogs
        </Link>
        <Link to="/users" className="hover:text-blue-300">
          Users
        </Link>
      </div>
      <div>
        <span className="mr-4">{user.username} logged in</span>
        <button
          onClick={logOut}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
