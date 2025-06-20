const { router } = require("../app");

router.get('/something', function(req, res, next) {
    req.pool.getConnection
})