const { db, tables } = require("../../db/knex");

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
  posts(_, { cursor, limit }, ctx, info) {
    let query = all().orderBy("created_at", "DESC");
    query = cursor
      ? query.where("created_at", "<", new Date(parseInt(cursor))).limit(limit)
      : query.limit(limit);
    return query.then(rows => {
      return {
        edges: rows,
        pageInfo: {
          endCursor: rows[rows.length - 1].created_at
        }
      };
    });
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
