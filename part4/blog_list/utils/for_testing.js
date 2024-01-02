const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0
  }
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let maxLikedBlog = blogs[0]

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikedBlog.likes) {
      maxLikedBlog = blogs[i]
    }
  }

  const { author, title, likes } = maxLikedBlog
  return { author, title, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}