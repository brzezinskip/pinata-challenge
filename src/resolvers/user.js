const { db, tables } = require("../../db/knex");

const byId = id =>
  db(tables.USERS)
    .where({ id })
    .first()
    .then(p => p);

const queries = {
  user(_, { id }, ctx, info) {
    return byId(id);
  }
};

module.exports = {
  user: {
    queries,
    byId
  }
};
