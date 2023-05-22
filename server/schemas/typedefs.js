const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
  
  type Book {
    _id: ID!
    bookId: ID!
    authors: [String]
    description: String!
    title: String!
    image: String!
    link: String!
    
  }
  
  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    me: User
  }
  
  type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: SavedBookInput): User
        removeBook(bookId: String!): User
}
  
  input SavedBookInput {
    bookId: ID!
    title: String!
    authors: [String]
    description: String!
    image: String!
    link: String!
  }

`;

module.exports = typeDefs; 