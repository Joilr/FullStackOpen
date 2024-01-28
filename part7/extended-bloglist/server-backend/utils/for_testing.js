const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0;
  }
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let maxLikedBlog = blogs[0];

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikedBlog.likes) {
      maxLikedBlog = blogs[i];
    }
  }

  const { author, title, likes } = maxLikedBlog;
  return { author, title, likes };
};

function mostBlogs(blogs) {
  const groupedBlogs = _.groupBy(blogs, 'author');

  const authorBlogCounts = _.map(groupedBlogs, (authorBlogs, author) => ({
    author: author,
    blogs: authorBlogs.length,
  }));

  const topAuthor = _.maxBy(authorBlogCounts, 'blogs');

  return topAuthor;
}

function mostLikes(blogs) {
  const groupedBlogs = _.groupBy(blogs, 'author');

  const authorLikes = _.mapValues(groupedBlogs, (blogs) => {
    return _.reduce(blogs, (sum, blog) => sum + blog.likes, 0);
  });

  const mostLikedAuthor = _.maxBy(
    _.keys(authorLikes),
    (author) => authorLikes[author],
  );

  const result = {
    author: mostLikedAuthor,
    likes: authorLikes[mostLikedAuthor],
  };

  return result;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
