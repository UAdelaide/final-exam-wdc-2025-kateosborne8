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
        const [rows] = await db.query('SELECT u.username AS walker_username, COUNT(DISTINCT rate.rating_id) AS total_ratings, ROUND(AVG(rate.rating),1) AS average_rating, COUNT(DISTINCT wa.request_id) AS completed_walks FROM WalkRatings AS rate JOIN Users AS u ON rate.walker_id = u.user_id JOIN WalkApplications AS wa ON wa.walker_id = u.user_id JOIN WalkRequests as wr ON wa.request_id = wr.request_id WHERE wa.status="accepted" AND wr.status="completed" GROUP BY rate.walker_id;');
        res.json(rows);
    } catch (err) {
        console.error("Database Error: ", err);
        res.status(500).send("Failed to retreive data from database.");
    }

});

router.post('/myDogs', async(req, res) => {
    // IF not logged in, can't get them dogs
    if (!req.session.user) {
        return res.status(401).json({ error: ''})
    }
    try {
        const [rows] = await db.query('SELECT name FROM Dogs WHERE user_id = ?', userID);
    } catch {

    }
})

module.exports = router;

