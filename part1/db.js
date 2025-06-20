const mysql = require('mysql2/promise');

var db = mysql.createPool({
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'DogWalkService'
});

module.exports = db;
