import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';
import Notification from './components/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => (
    <Togglable buttonLabel="log in" className="log-in-btn">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  );

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5));
    }
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable
      buttonLabel="new blog"
      className="new-blog-btn"
      ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      dispatch(
        setNotification(
          `A new blog ${blogObject.title} by ${blogObject.author} added`,
          5,
        ),
      );
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const updateBlog = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? returnedBlog : blog,
      );
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const deleteBlog = async (id) => {
    console.log(id);
    try {
      await blogService.remove(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div>
      {!user && (
        <div>
          <h1>login to application</h1>
          <Notification />
        </div>
      )}

      {!user && loginForm()}

      {user && (
        <div>
          <h1>blogs</h1>
          <Notification />
          <p>
            {user.name} logged in <button onClick={logOut}>logout</button>
          </p>
          <div>{blogForm()}</div>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLikeClick={updateBlog}
                handleDeleteClick={deleteBlog}
                loggedInUser={user}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
