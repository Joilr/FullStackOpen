import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
      author {
        name
      }
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation changeAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const GET_BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      genres
      author {
        name
      }
      published
    }
  }
`;

export const GET_MY_FAVORITE_GENRE = gql`
  query GetMyFavoriteGenre {
    me {
      username
      favorite_genre
    }
  }
`;
