const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const app = express();
const typeDefs = require('./schema');
const resolvers = require('./resolver')

//Your github PAT 
//removing personal github PAT, Please paste your own
const GITHUB_PAT = 'test_PAT';

async function start() {
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
        headers: {
          Authorization: `Bearer ${GITHUB_PAT}`,
        },
      }),
  });
await server.start()
server.applyMiddleware({ app });


//Port Listning
const port = process.env.PORT || 5000
app.listen(port,()=>`Listning on port ${port}`)
}

start().catch((error) => {
    console.error('Error starting the server:', error);
});