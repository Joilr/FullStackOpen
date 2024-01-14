import React, { useState } from 'react';

const Blog = ({ blog, handleLikeClick }) => {
  const [blogVisibility, setBlogVisibility] = useState('View');

  const toggleVisibility = () => {
    setBlogVisibility((prevVisibility) => (prevVisibility === 'View' ? 'Hide' : 'View'));
  };

  const updateForm = (blog) => {

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    handleLikeClick(blog.id, updatedBlog)

  };

  return (
    <div className='blog-text'>

      {blog.title} {blog.author}{' '}

      <button onClick={toggleVisibility}>{blogVisibility}</button>

      {blogVisibility === 'Hide' && 
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => updateForm(blog)}>like</button></div>
        <div>{blog.user.username}</div>
      </div>

      }
    </div>
  );
};

export default Blog;
