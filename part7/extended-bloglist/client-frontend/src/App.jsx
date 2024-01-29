import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRef } from 'react';
import BlogList from './components/BlogList';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import UsersList from './components/UsersList';
import UserID from './components/UserID';
import BlogID from './components/BlogID';
import NavBar from './components/NavBar';
import './index.css';
import Notification from './components/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();
  dispatch(initializeBlogs());

  const blogFormRef = useRef();

  return (
    <Router>
      <div>
        {!user && (
          <div>
            <h1>login to application</h1>
            <Notification />
            <Togglable buttonLabel="log in" className="log-in-btn">
              <LoginForm />
            </Togglable>
          </div>
        )}

        {user && (
          <div>
            <NavBar />
            <h1>blogs</h1>
            <Notification />

            <Togglable
              buttonLabel="new blog"
              className="new-blog-btn"
              ref={blogFormRef}
            >
              <BlogForm />
            </Togglable>

            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:id" element={<UserID />} />
              <Route path="/blogs/:id" element={<BlogID />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
