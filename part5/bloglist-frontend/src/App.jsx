import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('') 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
        setNewBlog({ title: '', author: '', url: '' })
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
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

      {!user && <div>
        <h1>log in to application</h1>
        <Notification message={message} />
        {loginForm()}
      </div>
      } 


      {user && <div>
        <h1>blogs</h1>

        <Notification message={message} />

        <p>{user.name} logged in <button onClick={logOut}>logout</button></p>

        <h1>create new</h1>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input 
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            />
          </div>
          <div>
            author:
            <input 
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            />
          </div>
          <div>
            url:
            <input 
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
            />
          </div>
          <button type="submit">create</button>
        </form>

        <br />

        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
        </div>
      }

    </div>
  )
}

export default App