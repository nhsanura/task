// schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Repository {
    name: String
    owner: String
    description: String
    url: String
    size: Int
    isPrivate: Boolean
    filesCount: Int
    yamlContent: String
    webhooksCount: Int
  }

  type Query {
    repositories(username: String!): [Repository]
    repository(owner: String!, name: String!): Repository
  }
`;

module.exports = typeDefs;
