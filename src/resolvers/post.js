const { db, tables } = require("../../db/knex");
const { paginatedQuery } = require("../lib/tools");

const byId = id =>
  db(tables.POSTS)
    .where({ id })
    .first()
    .then(p => p);

const all = () => db.select().table(tables.POSTS);

const create = ({ title, body, user_id }) =>
  db(tables.POSTS)
    .insert({ title, body, user_id })
    .returning("id")
    .then(([id]) => id);

const remove = id =>
  db(tables.POSTS)
    .where({ id })
    .del()
    .returning("id")
    .then(([id]) => id);

const queries = {
  posts(_, { limit, after, orderBy }, ctx, info) {
    return paginatedQuery(all, { limit, after, orderBy });
  },
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
