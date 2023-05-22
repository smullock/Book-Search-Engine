const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();

//import apolloserver class from apolloserver express package
const { ApolloServer } = require('apollo-server-express'); 

// Import the schema and resolvers for the GraphQL API
const { typeDefs, resolvers } = require('./schemas');

// Create a new instance of ApolloServer with the schema and resolvers
const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const updatedReq = authMiddleware({ req });
    return { user: updatedReq.user };
  },
});


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Serve the client's index.html file in production mode
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
}

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start(); // Start the ApolloServer
  server.applyMiddleware({ app }); // Add the ApolloServer middleware to the Express app

  db.once('open', () => {  
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
  
};

startApolloServer(typeDefs, resolvers); 