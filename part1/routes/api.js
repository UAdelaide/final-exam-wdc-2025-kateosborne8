var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/dogs', function(req, res, next) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = 'SELECT name, size, username AS owner_username FROM Dogs AS d JOIN Users AS u ON d.owner_id = u.user_id;';
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

router.get('/walkrequests/open', function(req, res, next) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = 'SELECT wr.request_id, d.name AS dog_name, requested_time, duration_minutes, location, u.username AS owner_username FROM WalkRequests AS wr JOIN Dogs AS d ON wr.dog_id = d.dog_id JOIN Users AS u ON u.user_id = d.owner_id WHERE wr.status="open";';
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

