exports.seed = (knex, Promise) =>
  knex("users")
    .del() // Deletes ALL existing entries
    .then(() =>
      // Insert user seeds
      knex("users").insert({
        first_name: "Jon",
        last_name: "Doe",
        email: "jon.doe@gmail.com"
      })
    )
    .then(() =>
      knex("users").insert({
        first_name: "Piotr",
        last_name: "Brzezinski",
        email: "peb.brzezinski@gmail.com"
      })
    )
    .then(() =>
      knex("users").insert({
        first_name: "Test",
        last_name: "User",
        email: "testuser@gmail.com"
      })
    );
