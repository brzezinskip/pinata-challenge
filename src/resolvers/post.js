const db = require("../../db/knex");

const byId = id =>
  db("posts")
    .where({ id })
    .first()
    .then(p => p);

const all = () => db.select().table("posts");

const create = ({ title, body, user_id }) =>
  db("posts")
    .insert({ title, body, user_id })
    .returning("id")
    .then(([id]) => id);

const remove = id =>
  db("posts")
    .where({ id })
    .del()
    .returning("id")
    .then(([id]) => id);

const queries = {
  posts: all,
  post(_, { id }, ctx, info) {
    return byId(id);
  }
};

const mutations = {
  createPost(
    _,
    {
      input: { title, body, user_id }
    },
    ctx,
    info
  ) {
    return create({ title, body, user_id });
  },
  removePost(_, { id }, ctx, info) {
    return remove(id);
  }
};

module.exports = {
  post: {
    queries,
    mutations
  }
};
