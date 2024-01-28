import React, { useState } from 'react'

const Blog = ({ blog, handleLikeClick, handleDeleteClick, loggedInUser }) => {
  const [blogVisibility, setBlogVisibility] = useState('View')

  const toggleVisibility = () => {
    setBlogVisibility((prevVisibility) => (prevVisibility === 'View' ? 'Hide' : 'View'))
  }

  //updates likes
  const updateForm = (blog) => {

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    handleLikeClick(blog.id, updatedBlog)

  }


  return (
    <div className='blog-text'>

      <span className='blog-title'>{blog.title}</span> <span className='blog-author'>{blog.author}</span>{' '}

      <button onClick={toggleVisibility}>{blogVisibility}</button>

      {blogVisibility === 'Hide' &&
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button className='like-btn' onClick={() => updateForm(blog)}>like</button></div>
        <div>{blog.user.username}</div>

        {loggedInUser.name === blog.user.name &&
        <button className='rm-btn' onClick={() => {
          if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
            handleDeleteClick(blog.id)
          }}}>remove</button>
        }
      </div>

      }
    </div>
  )
}

export default Blog
