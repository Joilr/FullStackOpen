import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { removeBlog } from '../reducers/blogReducer';
import { likeBlog } from '../reducers/blogReducer';
import { useSelector, useDispatch } from 'react-redux';

const UsersList = () => {
  const id = useParams().id;
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  //delete blog
  const blogRemoval = (id) => {
    dispatch(removeBlog(id));
  };

  //updates likes
  const like = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(likeBlog(blog.id, updatedBlog));
    setBlog(updatedBlog);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/blogs/${id}`);
        const userData = await response.json();
        setBlog(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    if (id) {
      fetchBlog();
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <h2>{blog.url}</h2>
      <div>
        <span>
          <span>{blog.likes} likes</span>{' '}
          <button className="like-btn" onClick={() => like(blog)}>
            like
          </button>
        </span>
      </div>
      <h2>{user.username}</h2>

      <button
        className="rm-btn"
        onClick={() => {
          if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
            blogRemoval(blog.id);
          }
        }}
      >
        remove
      </button>
    </div>
  );
};

export default UsersList;
