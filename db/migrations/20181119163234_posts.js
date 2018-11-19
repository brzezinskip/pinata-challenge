exports.up = (knex, _) =>
  knex.schema.createTable("posts", table => {
    table.increments().primary();
    table.timestamps(true, true);
    table
      .string("title")
      .notNullable()
      .unique();
    table.string("body").notNullable();

    //relationships
    table.integer("user_id").references("users.id");
  });

exports.down = (knex, _) => knex.schema.dropTable("posts");
