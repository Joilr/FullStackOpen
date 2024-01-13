import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [blogVisibility, setBlogVisibility] = useState('View');

  const toggleVisibility = () => {
    setBlogVisibility((prevVisibility) => (prevVisibility === 'View' ? 'Hide' : 'View'));
  };

  return (
    <div className='blog-text'>

      {blog.title} {blog.author}{' '}

      <button onClick={toggleVisibility}>{blogVisibility}</button>

      {blogVisibility === 'Hide' && 
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        <div>{blog.user.username}</div>
      </div>

      }
    </div>
  );
};

export default Blog;
