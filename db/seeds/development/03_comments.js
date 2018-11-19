exports.seed = (knex, _) =>
  knex("comments")
    .del() // Deletes ALL existing entries
    // Insert post seeds
    .then(() =>
      knex("comments").insert([
        {
          body: "this is my first comment",
          user_id: 1
        },
        {
          body: "another comment",
          user_id: 1
        },
        {
          body: "new comment",
          user_id: 2
        },
        {
          body: "i love commenting",
          user_id: 3
        },
        {
          body: "comments give me power",
          user_id: 3
        }
      ])
    );
