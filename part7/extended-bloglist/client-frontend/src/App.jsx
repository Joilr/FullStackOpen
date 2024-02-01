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
import './output.css';
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
            <Notification />
            <Togglable
              buttonLabel="log in"
              className="m-6 p-4 log-in-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              <LoginForm />
            </Togglable>
          </div>
        )}

        {user && (
          <div>
            <NavBar />
            <Notification />

            <Togglable
              buttonLabel="Create blog"
              className="new-blog-btn m-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
