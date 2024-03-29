const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      let query = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return []; // Return empty array if author not found
        query.author = author.id;
      }

      if (args.genre) {
        query.genres = { $in: args.genre };
      }

      return Book.find(query).populate("author");
    },

    allAuthors: async (root, args) => {
      return Author.find({}).populate("books");
    },

    me: async (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: (author) => {
      return author.books.length;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (args.title.length < 5) {
        throw new Error("Title must be at least 5 characters");
      }

      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      try {
        let author = await Author.findOne({ name: args.author });

        if (!author) {
          if (args.author.length < 4) {
            throw new Error("Author name must be at least 4 characters", {
              extensions: {
                code: "BAD_AUTHOR_INPUT",
                invalidArgs: args.author.name,
              },
            });
          }
          author = new Author({
            name: args.author,
          });
          await author.save();
        }

        const book = new Book({
          ...args,
          author: author._id,
        });

        await book.save();

        author.books.push(book._id);
        await author.save();

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

        return book;
      } catch (error) {
        console.error("Error adding book:", error);
        throw new Error("Error adding book");
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      try {
        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.setBornTo } },
          { new: true }
        );

        if (!author) {
          throw new GraphQLError(`Author not found: ${args.name}`, {
            extensions: {
              code: "BAD_AUTHOR_INPUT",
              invalidArgs: args.name,
            },
          });
        }

        return author;
      } catch (error) {
        console.error("Error updating author:", error.message);
        throw new GraphQLError("Error updating author");
      }
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favorite_genre: args.favorite_genre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        favorite_genre: user.favorite_genre,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
