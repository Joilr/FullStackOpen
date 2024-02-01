import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3003/api/users'); // Replace with your actual API endpoint
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-5 max-w-xs">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Users</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Blogs created
      </h2>
      <ul className="bg-white rounded-lg border border-gray-200 p-4">
        {users.map((user) => (
          <li key={user.id} className="py-2 border-b border-gray-100">
            <Link
              to={`/users/${user.id}`}
              className="mr-2 font-bold text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
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
