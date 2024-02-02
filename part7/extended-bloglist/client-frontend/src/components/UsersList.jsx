import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3003/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-xs p-5">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">Users</h1>
      <h2 className="mb-2 text-xl font-semibold text-gray-700">
        Blogs created
      </h2>
      <ul className="p-4 bg-white border border-gray-200 rounded-lg">
        {users.map((user) => (
          <li key={user.id} className="py-2 border-b border-gray-100">
            <Link
              to={`/users/${user.id}`}
              className="mr-2 font-bold text-blue-500 transition duration-300 ease-in-out hover:text-blue-700"
            >
              {user.username}:
            </Link>
            <span className="text-gray-600">{user.blogs.length}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
