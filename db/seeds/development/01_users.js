exports.seed = (knex, _) =>
  knex("users")
    .del() // Deletes ALL existing entries
    // Insert user seeds
    .then(() =>
      knex("users").insert([
        {
          id: 1,
          first_name: "Jon",
          last_name: "Doe",
          email: "jon.doe@gmail.com"
        },
        {
          id: 2,
          first_name: "Piotr",
          last_name: "Brzezinski",
          email: "peb.brzezinski@gmail.com"
        },
        {
          id: 3,
          first_name: "Test",
          last_name: "User",
          email: "testuser@gmail.com"
        }
      ])
    );
