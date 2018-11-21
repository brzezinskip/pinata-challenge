# Pinata exercise app

### Running the app:

- Create two postgres databases - **pinata_dev** and **pinata_test**
- Run `npm install` inside of the main folder
- Run `knex migrate:latest --env development && kenx migrate:latest --env test` to run database migrations
- Run `knex seed:run --env development && knex seed:run --env test` to seed database with some data
- Run `node index.js` or (recommended) `nodemon index.js` to start the server. You can now access graphql playground on **localhost:3000/graphql**

### Running tests:

- To start tests simply run `npm test`. It includes tests watcher so any changes to test file will make it re-run
