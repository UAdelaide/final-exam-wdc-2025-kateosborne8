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

      // Insert data if table is empty
      const [rows] = await db.execute('SELECT COUNT(*) AS count FROM Users');
      if (rows[0].count === 0) {
        await db.execute(`
          INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) SELECT dog_id, '2025-06-10 08:00:00' AS requested_time, 30 AS duration_minutes, 'Parklands' AS location, 'open' AS status FROM Dogs WHERE name='Max';

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) SELECT dog_id, '2025-06-10 09:30:00' AS requested_time, 45 AS duration_minutes, 'Beachside Ave' AS location, 'accepted' AS status FROM Dogs WHERE name='Bella';

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) SELECT dog_id, '2025-06-11 10:00:00' AS requested_time, 60 AS duration_minutes, 'Brighton' AS location, 'open' AS status FROM Dogs WHERE name='Chase';

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) SELECT dog_id, '2025-07-07 06:00:00' AS requested_time, 60 AS duration_minutes, 'Somerton' AS location, 'open' AS status FROM Dogs WHERE name='Chase';

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) SELECT dog_id, '2025-06-10 08:00:00' AS requested_time, 100 AS duration_minutes, 'Frosty Mountains' AS location, 'open' AS status FROM Dogs WHERE name='WolfDog';

        `);
      }



    } catch (err) {
      console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
    }
  })();

module.exports = db;
