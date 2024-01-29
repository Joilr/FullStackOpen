import { useState, useEffect } from 'react';

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
    <div>
      <h1>Users</h1>
      <h2>blogs created</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} {user.blogs.length}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
