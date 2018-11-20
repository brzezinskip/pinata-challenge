const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { post } = require("./src/resolvers/post");

const typeDefs = gql`
  input createPostInput {
    body: String
    title: String!
    user_id: ID!
  }
  type post {
    id: ID!
    title: String!
    body: String
    user_id: ID!
    created_at: String
  }
  type Query {
    posts: [post]
    post(id: ID!): post
  }
  type Mutation {
    createPost(input: createPostInput): String!
    removePost(id: ID!): String!
  }
`;

const resolvers = {
  Query: {
    ...post.queries
  },
  Mutation: {
    ...post.mutations
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });
const port = 3000;

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
