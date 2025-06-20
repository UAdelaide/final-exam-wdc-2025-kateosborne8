var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/something', function(req, res, next) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = 'SELECT name, FROM Dogs;';
        connection.query(query, function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});

module.exports = router;

