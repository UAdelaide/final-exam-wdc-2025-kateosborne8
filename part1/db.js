var mysql = require('mysql');

var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'DogWalkService'
});

module.exports = dbConnectionPool;
