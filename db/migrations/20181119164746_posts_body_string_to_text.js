exports.up = (knex, Promise) =>
  knex.schema.alterTable("posts", table => table.text("body").alter());

exports.down = (knex, Promise) =>
  knex.schema.alterTable("posts", table => table.string("body").alter());
