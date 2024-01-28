import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    loggedOnUser(state, action) {
      return action.payload;
    },
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser, loggedOnUser } = userSlice.actions;

export const login = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export const activeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(loggedOnUser(user));
    }
  };
};

export default userSlice.reducer;
