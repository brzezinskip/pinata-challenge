const { db, tables } = require("../../db/knex");
const { paginatedQuery } = require("../lib/tools");

const byId = id =>
  db(tables.COMMENTS)
    .where({ id })
    .first()
    .then(p => p);

const all = () => db.select().table(tables.COMMENTS);

const commentsByPostId = id =>
  db
    .select()
    .table(tables.COMMENTS)
    .where({ post_id: id });

const create = ({ body, user_id, post_id }) =>
  db(tables.COMMENTS)
    .insert({ body, user_id, post_id })
    .returning("id")
    .then(([id]) => id)
    .catch(e => e);

const remove = id =>
  db(tables.COMMENTS)
    .where({ id })
    .del()
    .returning("id")
    .then(([id]) => id)
    .catch(e => e);

const queries = {
  comments(_, { input: { limit, after, orderBy } = {} }, ctx, info) {
    return paginatedQuery(all, { limit, after, orderBy });
  },
  comment(_, { id }, ctx, info) {
    return byId(id);
  }
};

const mutations = {
  createComment(
    _,
    {
      input: { body, user_id, post_id }
    },
    ctx,
    info
  ) {
    return create({ body, user_id, post_id });
  },
  removeComment(_, { id }, ctx, info) {
    return remove(id);
  }
};

module.exports = {
  comment: {
    queries,
    mutations,
    commentsByPostId,
    byId,
    all,
    create,
    remove
  }
};
