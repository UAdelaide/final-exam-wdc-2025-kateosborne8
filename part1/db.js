var mysql = require('mysql');

var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'DogWalkService'
});

app.use(function(req, res, next) {
    req.pool = dbConnectionPool;
    next();
});
