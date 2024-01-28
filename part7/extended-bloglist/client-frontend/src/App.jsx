import { useState, useRef } from 'react';
import BlogList from './components/BlogList';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import './index.css';
import Notification from './components/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();
  dispatch(initializeBlogs());

  const loginForm = () => (
    <Togglable buttonLabel="log in" className="log-in-btn">
      <LoginForm />
    </Togglable>
  );

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

          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
