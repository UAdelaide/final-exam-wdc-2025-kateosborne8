const { router } = require("../app");

router.get('/something', function(req, res, next) {
    req.pool.getConnection( function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = 'SELECT * FROM Dogs;';
        connection.query(query, function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
})
