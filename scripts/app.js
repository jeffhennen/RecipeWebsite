const express = require('express');
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
  } else {
    console.log('Connected to the database');
  }
});

const app = express();

// Define your API routes and logic here

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Retrieve all records from a table
app.get('/api/records', (req, res) => {
  connection.query('SELECT * FROM your_table', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).json({ error: 'Failed to retrieve records' });
    } else {
      res.json(results);
    }
  });
});

// Insert a new record into a table
app.post('/api/records', (req, res) => {
  const record = req.body; // assuming you send the record data in the request body
  connection.query('INSERT INTO your_table SET ?', record, (error, result) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).json({ error: 'Failed to insert record' });
    } else {
      res.status(201).json({ message: 'Record inserted successfully' });
    }
  });
});

// Define other routes for updating and deleting records

// Add more routes as needed

