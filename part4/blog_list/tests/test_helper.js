const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Many Jokes',
    author: 'Henrik',
    url: 'www.HenrikJokes.org',
    likes: 513,
    userId: '1'
  },
  {
    title: 'Richards Pitches',
    author: 'Pitches',
    url: 'www.Pitches.org',
    likes: 5134,
    userId: '2'
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}