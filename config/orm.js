// Import MySQL connection.
var connection = require("../config/connection");

function createQmarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function translateSql(ob) {
  var arr = [];

  // Loop through the keys and push the key/value as a string into arr
  for (var key in ob) {
    var value = ob[key];
    // Check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

// Object for all SQL statement functions
var orm = {
  selectAll: function(table, cb) {
    var dbQuery = "SELECT * FROM " + table + ";";

    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var dbQuery =
      "INSERT INTO " +
      table +
      " (" +
      cols.toString() +
      ") " +
      "VALUES (" +
      createQmarks(vals.length) +
      ") ";

    console.log(dbQuery);
    connection.query(dbQuery, vals, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  updateOne: function(table, objColVals, condition, cb) {
    var dbQuery =
      "UPDATE " +
      table +
      " SET " +
      translateSql(objColVals) +
      " WHERE " +
      condition;

    console.log(dbQuery);

    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  deleteOne: function(table, condition, cb) {
    var dbQuery = "DELETE FROM " + table + " WHERE " + condition;
    console.log(dbQuery);

    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};

// Export the ORM object for the model 
module.exports = orm;
