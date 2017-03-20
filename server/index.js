// Import Modules
var express = require('express');
var sqlite3 = require('sqlite3');
var anyDB = require('any-db-sqlite3');

// Import Models
var Table = require('./models/Table.js');
var Column = require('./models/Column.js');

// Create Database
var db = new sqlite3.Database('server/chatroom.db');
// Connect to Database
var conn = anyDB.createConnection(db);
// Create Express App
var app = express();

// 'users' Table model
var users = new Table("users");
users.addColumn(new Column("id", "INTEGER", "PRIMARY KEY"));
users.addColumn(new Column("username", "TEXT"));
conn.query(users.toSQL()); // map to sql database

// 'messages' Table model
var messages = new Table("messages");
messages.addColumn(new Column("id", "INTEGER", "PRIMARY KEY"));
messages.addColumn(new Column("content", "TEXT"));
conn.query(messages.toSQL()); // map to sql database

// 'chatrooms' Table model
var chatrooms = new Table("chatrooms");
chatrooms.addColumn(new Column("id", "INTEGER", "PRIMARY KEY"));
chatrooms.addColumn(new Column("name", "TEXT"));
conn.query(chatrooms.toSQL()); // map to sql database


app.listen(8080, function () {
  console.log('Listening on port 8080');
  console.log(users.toSQL());
  console.log(messages.toSQL());
  console.log(chatrooms.toSQL());
  conn.query("INSERT INTO messages (id,content) VALUES (1, 'hello')");
})

app.get('/', function(req, res) {
  conn.query('SELECT * FROM messages', function(error, data){
    res.send(data);
  });
});