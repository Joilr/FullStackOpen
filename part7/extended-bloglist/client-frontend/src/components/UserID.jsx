import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const UsersList = () => {
  const id = useParams().id;
  const [user, setUser] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/users/${id}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/blogs/');
        const blogData = await response.json();
        setBlogs(blogData);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    if (id) {
      fetchUser();
    }
    fetchBlogs();
    setLoading(false);
  }, [id]);

  //Match person id with id from blogs to gather the specific blog items
  const personBlogs = blogs.filter((blog) => blog.user.id === id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>{user.username} </h1>
      <h2>added blogs</h2>
      <ul>
        {personBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
