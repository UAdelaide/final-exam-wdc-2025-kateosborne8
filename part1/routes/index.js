var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/something', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
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
});

module.exports = router;
