const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int!
    savedBooks: [Book]
  }
  
  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    title: String!
    image: String!
    link: String!
    
  }
  
  type Auth {
    token: String!
    user: User!
  }
  
  type Query {
    getUser(id: ID!): User
    getSingleUser(username: String!): User
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(usernameOrEmail: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    removeBook(bookId: ID!): User
  }
  
  input BookInput {
    bookId: ID!
    title: String!
    authors: [String]
    description: String!
    image: String!
    link: String!
  }

`;

module.exports = typeDefs; 