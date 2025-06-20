const mysql = require('mysql2/promise');

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService'
});

(async () => {
    try {
      // Connect to MySQL without specifying a database
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '' // Set your MySQL root password
      });

      // Create the database if it doesn't exist
      await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
      await connection.end();

      // Now connect to the created database
      db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'DogWalkService'
      });

      // Create a table if it doesn't exist
      await db.execute(`
        CREATE TABLE IF NOT EXISTS Users (
          user_id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50),
          email VARCHAR(50),
          password_hash varchar(255),
          role enum('owner', 'walker')
          created_at timestamp
        )
      `);

      // Insert data if table is empty
      const [rows] = await db.execute('SELECT COUNT(*) AS count FROM Users');
      if (rows[0].count === 0) {
        await db.execute(`
          INSERT INTO Users (username, email, password_hash, role) VALUES
          ('alice123', 'alice@example.com', 'hashed123', 'owner'),
          ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
          ('carol123', 'carol@example.com', 'hashed789', 'owner'),
          ('kateo8', 'kate@example.com', 'hashed888', 'owner'),
          ('jacob7', 'jacob@example.com', 'hashed700', 'walker');
        `);
      }

      // Create a table if it doesn't exist
      await db.execute(`
        CREATE TABLE IF NOT EXISTS Dogs (
          dog_id INT AUTO_INCREMENT PRIMARY KEY,
          owner_id INT
          name VARCHAR(50),
          size enum('small', 'medium', 'large')
        )
      `);

      // Insert data if table is empty
      const [rows] = await db.execute('SELECT COUNT(*) AS count FROM Dogs');
      if (rows[0].count === 0) {
        await db.execute(`
          INSERT INTO Dogs (owner_id, name, size) SELECT user_id AS owner_id, 'Max' AS name, 'medium' AS size FROM Users WHERE username='alice123';

INSERT INTO Dogs (owner_id, name, size) SELECT user_id AS owner_id, 'Bella' AS name, 'small' AS size FROM Users WHERE username='carol123';

INSERT INTO Dogs (owner_id, name, size) SELECT user_id AS owner_id, 'Chase' AS name, 'medium' AS size FROM Users WHERE username='kateo8';

INSERT INTO Dogs (owner_id, name, size) SELECT user_id AS owner_id, 'WolfDog' AS name, 'large' AS size FROM Users WHERE username='alice123';

INSERT INTO Dogs (owner_id, name, size) SELECT user_id AS owner_id, 'Beau' AS name, 'large' AS size FROM Users WHERE username='alice123';

        `);
      }

      // Create a table if it doesn't exist
      await db.execute(`
        CREATE TABLE IF NOT EXISTS WalkRequests (
          request_id INT AUTO_INCREMENT PRIMARY KEY,
          dog_id INT,
          username VARCHAR(50),
          email VARCHAR(50),
          password_hash varchar(255),
          role enum('owner', 'walker')
          created_at timestamp
        )
      `);

      // Insert data if table is empty
      const [rows] = await db.execute('SELECT COUNT(*) AS count FROM Users');
      if (rows[0].count === 0) {
        await db.execute(`
          INSERT INTO Users (username, email, password_hash, role) VALUES
          ('alice123', 'alice@example.com', 'hashed123', 'owner'),
          ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
          ('carol123', 'carol@example.com', 'hashed789', 'owner'),
          ('kateo8', 'kate@example.com', 'hashed888', 'owner'),
          ('jacob7', 'jacob@example.com', 'hashed700', 'walker');
        `);
      }



    } catch (err) {
      console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
    }
  })();

module.exports = db;
