import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql_schema.js';



import { getNews, filterNewsByWord, filterNewsByCategory } from './controllers/new.controller.js';

//conexion to mongo
import mongoose from 'mongoose';
const db = mongoose.connect("mongodb+srv://", { useNewUrlParser: true, useUnifiedTopology: true });


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    news: async (parent, args, context, info) => {
      return await getNews(args.user_id);
    },
    newsByCategory: async (parent, args, context, info) => {
      return await filterNewsByCategory(args.category_id, args.user_id);
    },
    newsByWord: async (parent, args, context, info) => {
      return await filterNewsByWord(args.word, args.user_id);
    },
    version: () => "1.2"
  },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 3500 },
});

console.log(`🚀  Server ready at: ${url}`);