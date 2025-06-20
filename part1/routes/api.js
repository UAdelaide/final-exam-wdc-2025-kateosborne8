var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/dogs', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT name, size, username AS owner_username FROM Dogs AS d JOIN Users AS u ON d.owner_id = u.user_id;');
        res.json(rows);
    } catch (err) {
        console.error("Database Error: ", err);
        res.status(500).send("Failed to retreive data from database.");
    }

});

router.get('/walkrequests/open', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT wr.request_id, d.name AS dog_name, requested_time, duration_minutes, location, u.username AS owner_username FROM WalkRequests AS wr JOIN Dogs AS d ON wr.dog_id = d.dog_id JOIN Users AS u ON u.user_id = d.owner_id WHERE wr.status="open";');
        res.json(rows);
    } catch (err) {
        console.error("Database Error: ", err);
        res.status(500).send("Failed to retreive data from database.");
    }

});

router.get('/walkers/summary', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT u.username AS walker_username, COUNT(rate.rating_id) AS total_ratings, AVG(rate.rating) AS DECIMAL AS average_rating FROM WalkRatings AS rate JOIN Users AS u ON rate.walker_id = u.user_id WHERE u.role="walker" GROUP BY rate.walker_id;');
        res.json(rows);
    } catch (err) {
        console.error("Database Error: ", err);
        res.status(500).send("Failed to retreive data from database.");
    }

});

module.exports = router;

