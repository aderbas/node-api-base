// database connection instance
const massive = require('massive');
const connectionString = "postgres://<user>:<pwd>@<host>/<databasename>"; // if use ssl: ?ssl=true"

module.exports = {
  conn: massive(connectionString)
};
