const mysql = require('mysql2/promise');

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService'
});

module.exports = db;
