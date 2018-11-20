const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { post } = require("./src/resolvers/post");
const { user } = require("./src/resolvers/user");

const typeDefs = gql`
  input createPostInput {
    body: String
    title: String!
    user_id: ID!
  }
  type User {
    id: ID!
    first_name: String
    last_name: String
    email: String!
  }
  type Post {
    id: ID!
    title: String!
    body: String
    user_id: ID!
    created_at: String
    author: User!
  }
  type Query {
    posts(cursor: String, limit: Int): [Post]!
    post(id: ID!): Post!
    user(id: ID!): User!
  }
  type Mutation {
    createPost(input: createPostInput): String!
    removePost(id: ID!): String!
  }
`;

const resolvers = {
  Query: {
    ...post.queries,
    ...user.queries
  },
  Post: {
    author({ user_id }) {
      return user.byId(user_id);
    }
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
