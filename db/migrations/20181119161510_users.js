exports.up = (knex, _) =>
  knex.schema.createTable("users", table => {
    table.increments();
    table.string("first_name").nullable();
    table.string("last_name").nullable();
    table
      .string("email")
      .notNullable()
      .unique();
  });

exports.down = (knex, _) => knex.schema.dropTable("users");
