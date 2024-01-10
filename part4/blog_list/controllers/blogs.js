const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {

  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const user = request.user
  const useridString = user.blogs.map(objectId => objectId.toString())
  const blogId = request.params.id

  if (useridString.includes(blogId)) {
    await Blog.findByIdAndDelete(blogId)
    response.status(204).end()
  } else {
    response.status(401).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = {
    title,
    author,
    url,
    likes
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true, runValidators: true, context: 'query' })
  if(updated){
    response.json(updated)
  } else {
    response.status(404).end()
  }

})

module.exports = blogsRouter
