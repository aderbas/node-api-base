// database connection instance
module.exports = {
  conn: function(){
    return require("massive").connectSync({
      connectionString : "postgres://databaseuser:password@host/database" // if use ssl: ?ssl=true"
    });
  }
};
