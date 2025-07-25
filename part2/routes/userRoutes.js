const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

// POST login
router.post('/login', async (req, res) => {
  // Get values from the inputs as variables
  const { username, password } = req.body;

  try {
    // Query the database using what the user put in
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    // If the query comes back empty, there was no user that matched, therefore say no login for you
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Create the session with all their info in it
    req.session.user = {
      user_id: rows[0].user_id,
      username: rows[0].username,
      role: rows[0].role
    };

    // Send the cookie with their details and message back for teh alert
    res.json({ message: username, user: req.session.user });
  } catch (error) {
    // If something goes wrong reaching server
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', (req, res) => {
  // Get rid of the cookie session by DESTROYING it
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to Logout' });
    }
    res.json({ message: 'Logged out successfully!' });
  });
});



module.exports = router;
