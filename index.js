const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { post } = require("./src/resolvers/post");
const { user } = require("./src/resolvers/user");
const { comment } = require("./src/resolvers/comment");
const { paginatedQuery } = require("./src/lib/tools");

const typeDefs = gql`
  enum Sort {
    ID
    DATE
    AUTHOR
    TITLE
    BODY
  }
  enum Direction {
    ASC
    DESC
  }
  input Ordering {
    sort: Sort! = DATE
    direction: Direction! = DESC
  }
  input createPostInput {
    body: String
    title: String!
    user_id: ID!
  }
  input createCommentInput {
    body: String!
    user_id: ID!
    post_id: ID!
  }
  input QueryCommentsInput {
    post_id: ID
    limit: Int
    after: String
    orderBy: Ordering
  }
  type User {
    id: ID!
    first_name: String
    last_name: String
    email: String!
  }
  type Comment {
    id: ID!
    body: String!
    author: User!
    post: Post!
    created_at: String!
  }
  type CommentsConnection {
    edges: [CommentNode]!
    pageInfo: PageInfo!
  }
  type Post {
    id: ID!
    title: String!
    body: String
    user_id: ID!
    created_at: String!
    author: User!
    comments(input: QueryCommentsInput): CommentsConnection!
  }
  type PostNode {
    node: Post!
    cursor: String!
  }
  type CommentNode {
    node: Comment!
    cursor: String!
  }
  type PostsConnection {
    edges: [PostNode]!
    pageInfo: PageInfo!
  }
  type PageInfo {
    endCursor: String!
  }
  type Query {
    posts(limit: Int, after: String, orderBy: Ordering): PostsConnection!
    comments(input: QueryCommentsInput): CommentsConnection!
    post(id: ID!): Post!
    user(id: ID!): User!
    comment(id: ID!): Comment!
  }
  type Mutation {
    createPost(input: createPostInput): String
    removePost(id: ID!): String
    createComment(input: createCommentInput): String
    removeComment(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    ...post.queries,
    ...user.queries,
    ...comment.queries
  },
  Post: {
    author({ user_id }) {
      return user.byId(user_id);
    },
    comments(parent, { input: { limit, after, orderBy } = {} }, ctx, info) {
      return paginatedQuery(() => comment.commentsByPostId(parent.id), {
        limit,
        after,
        orderBy
      });
    }
  },
  Comment: {
    author({ user_id }) {
      return user.byId(user_id);
    },
    post({ post_id }) {
      return post.byId(post_id);
    }
  },
  Mutation: {
    ...post.mutations,
    ...comment.mutations
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
