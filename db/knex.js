const env = process.env.NODE_ENV || "development";

const config = require("../knexfile")[env];

module.exports = {
  db: require("knex")(config),
  tables: {
    POSTS: "posts",
    USERS: "users",
    COMMENTS: "comments"
  }
};
