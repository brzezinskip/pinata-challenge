const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { post } = require("./src/resolvers/post");

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
    posts: [Post]
    post(id: ID!): Post
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
  Post: {
    author({ user_id }) {
      return {
        id: user_id,
        first_name: "asd",
        last_name: "zxc",
        email: "a@b.com"
      };
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
