import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()

    createBlog ({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })

    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newBlog.title}
            onChange={(event) => setNewBlog({ ...newBlog, title: event.target.value })}
          />
        </div>
        <div>
        author:
          <input
            value={newBlog.author}
            onChange={(event) => setNewBlog({ ...newBlog, author: event.target.value })}
          />
        </div>
        <div>
        url:
          <input
            value={newBlog.url}
            onChange={(event) => setNewBlog({ ...newBlog, url: event.target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
