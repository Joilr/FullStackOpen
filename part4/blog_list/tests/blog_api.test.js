const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Many Jokes',
    author: 'Henrik',
    url: 'www.HenrikJokes.org',
    likes: 513
  },
  {
    title: 'Richards Pitches',
    author: 'Pitches',
    url: 'www.Pitches.org',
    likes: 5134
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Blog Creation', () => {
  test('a valid blog post can be added', async () => {

    const newBlog = {
      title: 'Left Side Querks',
      author: 'Ronny',
      url: 'www.Monny.org',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body.find(blog => blog.title === newBlog.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(addedBlog).toBeDefined()
    expect(addedBlog.title).toEqual(newBlog.title)
    expect(addedBlog.author).toEqual(newBlog.author)
    expect(addedBlog.url).toEqual(newBlog.url)
    expect(addedBlog.likes).toEqual(newBlog.likes)
  })



  test('missing likes property defaults to 0', async () => {
    const newBlogWithoutLikes = {
      title: 'A blog without likes',
      author: 'Test Author',
      url: 'http://testurl.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const createdBlog = response.body.find(blog => blog.title === newBlogWithoutLikes.title)

    expect(createdBlog).toBeDefined()
    expect(createdBlog.likes).toBe(0)
  })

  test('blog with missing title or url is not added', async () => {
    const newBlogWithoutTitle = {
      author: 'Test Author',
      url: 'http://testurl.com'
    }

    const newBlogWithoutUrl = {
      title: 'A blog without URL',
      author: 'Test Author'
    }

    // Test for missing title
    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)

    // Test for missing url
    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
  })
})

describe('Blog Retrieval', () => {
  test('blogs are returned as json, have a ID property', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const blogs = response.body
    expect(blogs).toBeInstanceOf(Array)
    blogs.forEach(blog => expect(blog.id).toBeDefined())
    blogs.forEach(blog => expect(blog._id).toBeUndefined())
  })
})

describe('Blog deletion', () => {

  test('blogpost was successfully deleted', async () => {

    //Adding new post to delete
    const newBlog = {
      title: 'This One Dlt',
      author: 'Dlt',
      url: 'www.Dlt.org',
      likes: 55
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)

    const addedBlogId = postResponse.body.id

    // Delete the blog post
    await api
      .delete(`/api/blogs/${addedBlogId}`)
      .expect(204)

  })
})

describe('Update blogpost', () => {

  test('blogpost was successfully updated', async () => {

    //Adding new post to delete
    const newBlog = {
      title: 'Newguy',
      author: 'new',
      url: 'www.new.org',
      likes: 555
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)

    const addedBlogId = postResponse.body.id

    //update to this
    const updatedBlog = {
      title: 'Updateguy',
      author: 'update',
      url: 'www.update.org',
      likes: 554
    }

    //update new blog post
    await api
      .put(`/api/blogs/${addedBlogId}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})