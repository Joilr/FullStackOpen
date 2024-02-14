const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `#graphql
  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
}

type Book {
  title: String!
  author: Author!
  published: Int! 
  genres: [String!]!
  id: ID!
}

type Author {
  name: String!
  born: Int
  bookCount: Int!
  id: ID!
}

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int! 
    genres: [String!]!
  ): Book

  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author

  createUser(
    username: String!
  ): User
    
  login(
    username: String!
    password: String!
  ): Token  
}

`;

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
      return Author.find({});
    },
  },

  Author: {
    bookCount: async (author) => {
      return await Book.countDocuments({ author: author.name });
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
      const user = new User({ username: args.username });

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
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url} !`);
});
