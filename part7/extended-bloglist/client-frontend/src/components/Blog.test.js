import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User',
      id: '123',
    },
  };

  let component;
  const user = userEvent.setup();
  const mockHandlerLike = jest.fn();
  const mockHandlerDelete = jest.fn();

  const loggedInUser = {
    name: 'Test User',
    username: 'testuser',
  };

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleLikeClick={mockHandlerLike}
        handleDeleteClick={mockHandlerDelete}
        loggedInUser={loggedInUser}
      />,
    );
  });

  test('renders title and author', () => {
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  test('does not render URL or likes by default', () => {
    const url = screen.queryByText('http://testurl.com');
    const likes = screen.queryByText('likes 5');
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test('Confirm URL and likes are shown when the toggle button is clicked', async () => {
    const visibilityButton = screen.getByText('View');
    await user.click(visibilityButton);

    expect(screen.getByText('http://testurl.com')).toBeInTheDocument();
    expect(screen.getByText('likes 5')).toBeInTheDocument();
  });

  test('If like button is clicked twice, the event handler is called twice', async () => {
    const visibilityButton = screen.getByText('View');
    await user.click(visibilityButton);

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandlerLike.mock.calls).toHaveLength(2);
  });
});
