exports.up = (knex, _) =>
  knex.schema.createTable("comments", table => {
    table.increments().primary();
    table.timestamps(true, true);
    table.string("body").notNullable();

    //relationships
    table.integer("user_id").references("users.id");
    table.integer("post_id").references("posts.id");
  });

exports.down = (knex, _) => knex.schema.dropTable("comments");
