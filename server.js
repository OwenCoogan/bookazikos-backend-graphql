require('dotenv').config();
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
  hello: String
  }
`;
const resolvers = {
  Query: {
  hello: () => 'Hello world!',
  },
};

class ServerClass{
  constructor(){
    this.app = express();
    this.server = new ApolloServer({ typeDefs, resolvers });
    this.port = process.env.PORT;
    }
    init(){
      this.config();
    }
    async config(){
      const app = this.app;
      await this.server.start();
      this.server.applyMiddleware({ app });
      this.launch();
    }
    launch(){
      const port = this.port;
      console.log(this.port)
      this.app.listen({ port }, () =>
      console.log(`🚀 Server ready at http://localhost:${port}${this.server.graphqlPath}`)
      );
  }

}
const MyServer = new ServerClass();
MyServer.init();
