const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'HennenServer',
  port: 3306,
  user: 'Jeffhennen',
  password: 'JackJ0hns0n2018!',
  database: 'sampledatabase',
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
app.use(bodyParser.json());

// Define your API routes and logic here

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Retrieve all records from a table
app.get('/api/Recipes', (req, res) => {
  connection.query('SELECT * FROM Recipes', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).json({ error: 'Failed to retrieve records' });
    } else {
      res.json(results);
    }
  });
});

// Insert a new record into a table
app.post('/api/Recipes', (req, res) => {
  const record = req.body; // assuming you send the record data in the request body
  connection.query('INSERT INTO recipe SET (name, yield_quantity, ', record, (error, result) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).json({ error: 'Failed to insert record' });
    } else {
      res.status(201).json({ message: 'Record inserted successfully' });
    }
  });
});

app.get('/api/Ingredient', (req, res) => {
  connection.query('SELECT * FROM Ingredient', (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).json({ error: 'Failed to retrieve records' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/Ingredient', (req, res) => {
  
  const record = req.body; // assuming you send the record data in the request body
  console.log(req.body);
  // ("tomato", "pcs", "5.25", "10.99")'
  connection.query('INSERT INTO Ingredient (name, measurement, quantity, cost) VALUES (?, ?, ?, ?)' ,[record.name, record.measurement, record.quantity, record.cost], (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Failed to insert record' });
    } else {
      res.status(201).json({ message: 'Record inserted successfully' });
    }
  });
});

// Define other routes for updating and deleting records

// Add more routes as needed

