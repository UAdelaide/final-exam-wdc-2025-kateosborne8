const mysql = require('mysql2/promise');

var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'DogWalkService'
});