import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (

    <Togglable buttonLabel='log in'>
      <LoginForm handleLogin={handleLogin}/>
    </Togglable>

  )

  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )


  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (error) {
      console.error('Error adding blog:', error)
    }
  }

  const updateBlog = async (id, updatedBlog) => {

    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? returnedBlog : blog
      )
      setBlogs(updatedBlogs)
    } catch (error) {
      console.error('Error updating blog:', error)
    }

  }

  const deleteBlog = async (id) => {
    console.log(id)
    try {
      await blogService.remove(id)
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }


  const Notification = ({ message }) => {
    if (message === '') {
      return null
    }

    if (message.includes('error') || message.includes('wrong')) {
      return (
        <div className='showMsg-red'>
          {message}
        </div>
      )
    }

    else {
      return (
        <div className='showMsg-green'>
          {message}
        </div>
      )
    }
  }

  return (
    <div>

      {!user &&
      <div>
        <h1>log in to application</h1>
        <Notification message={message} />
      </div>}

      {!user && loginForm()}

      {user &&
        <div>
          <h1>blogs</h1>
          <Notification message={message} />
          <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
          <div>{blogForm()}</div>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => <Blog key={blog.id} blog={blog} handleLikeClick={updateBlog} handleDeleteClick={deleteBlog} loggedInUser={user}/>)}
        </div>
      }

    </div>
  )
}

export default App