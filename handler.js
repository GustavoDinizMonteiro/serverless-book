'use strict';

const hello = async (event) => {

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      }
      )
    };
  };
  
const hello2 = () => ({
  message: 'Go Serverless with Graphql',
})


const { ApolloServer, gql } = require('apollo-server-lambda');
const {
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');

const typeDefs = gql`
  type Hello {
    message: String
  }

  type Query {
    hello: Hello
  }
`;

const resolvers = {
  Query: {
    hello: hello2
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

module.exports =  {
  hello,
  graphqlHandler: server.createHandler()
}
  


