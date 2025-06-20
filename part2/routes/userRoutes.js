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

// POST login (dummy version)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE email = ? AND password_hash = ?
    `, [email, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ login: false, error: 'Username and password are required' });
    }

    req.pool.query(
        'SELECT password_hash FROM Users WHERE username = ?',
        [username],
        async function (err, results) {
            if (err) {
                console.error('Database error:', err);
                return res
                    .status(500)
                    .json({ login: false, error: 'Database error' });
            }

            if (results.length === 0) {
                return res
                    .status(404)
                    .json({ login: false, error: 'User not found' });
            }

            const storedHash = results[0].password;

            try {
                const match = await bcrypt.compare(password, storedHash);
                if (!match) {
                    return res
                        .status(401)
                        .json({ login: false, error: 'Incorrect password' });
                }
                // password is correct
                req.session.user = username;
                return res.json({ login: true, username });
            } catch (compareErr) {
                console.error('Bcrypt compare error:', compareErr);
                return res
                    .status(500)
                    .json({ login: false, error: 'Server error' });
            }
        }
    );

module.exports = router;
