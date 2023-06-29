import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';




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
app.use(cors());

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



// fetch('http://HennenAPI.com:3000/api/recipes')
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Failed to retrieve recipes');
//     }
//   })
//   .then(recipes => {
//     const recipePromises = recipes.map(recipe => {
//       return fetch(`http://HennenAPI.com:3000/api/recipes/${recipe.id}/recipe_ingredients`)
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           } else {
//             throw new Error('Failed to retrieve recipe ingredients');
//           }
//         })
//         .then(recipeIngredients => {
//           recipe.recipe_ingredients = recipeIngredients;
//           return recipe;
//         });
//     });

//     return Promise.all(recipePromises);
//   })
//   .then(data => {
//     console.log(data); // Process the retrieved data with recipe_ingredients included
//   })
//   .catch(error => {
//     console.error('Error retrieving recipes:', error);
//   });


app.get('/api/recipes/:id/recipe_ingredients', (req, res) => {
  const recipeId = req.params.id;

  connection.query(
    'SELECT * FROM recipe_ingredients WHERE recipe_id = ?',  [recipeId],
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Failed to retrieve recipe ingredients' });
      } else {
        res.json(results);
      }
    }
  );
});


// // Insert a new record into a table
// app.post('/api/Recipes', (req, res) => {
//   const record = req.body; // assuming you send the record data in the request body
//   connection.query('INSERT INTO recipe SET (name, yield_quantity, ', record, (error, result) => {
//     if (error) {
//       console.error('Error executing query: ', error);
//       res.status(500).json({ error: 'Failed to insert record' });
//     } else {
//       res.status(201).json({ message: 'Record inserted successfully' });
//     }
//   });
// });


// Insert a new recipe and its ingredients
app.post('/api/recipes', (req, res) => {
  const recipe = req.body.recipe; // Assuming the recipe data is sent in the request body
  const ingredients = recipe.ingredients; // Assuming the ingredients data is sent in the request body

  // Step 1: Insert the recipe into the recipes table
  connection.query('INSERT INTO Recipes (name, quantity, measurement, description) VALUES (?, ?, ?, ?)', [recipe.name, recipe.quantity, recipe.measurement, recipe.description], (error, recipeResult) => {
    if (error) {
      console.error('Error executing recipe query:', error);
      res.status(500).json({ error: 'Failed to insert recipe' });
    } else {
      const recipeId = recipeResult.insertId;

      // Step 2: Iterate over the ingredients and insert into recipe_ingredients table
      const insertPromises = ingredients.map((ingredient) => {
        return new Promise((resolve, reject) => {
          // Step 3: Insert ingredient into the recipe_ingredients table
          connection.query(
            'INSERT INTO Recipe_Ingredients (recipe_id, name, ingredient_id, quantity, measurement) VALUES (?, ?, ?, ?, ?)',
            [recipeId, ingredient.name, ingredient.id, ingredient.quantity, ingredient.measurement],
            (error, ingredientResult) => {
              if (error) {
                console.error('Error executing ingredient query:', error);
                reject(error);
              } else {
                resolve(ingredientResult);
              }
            }
          );
        });
      });

      // Step 4: Check if all insertions were successful
      Promise.all(insertPromises)
        .then(() => {
          res.status(201).json({ message: 'Recipe and ingredients inserted successfully' });
        })
        .catch((error) => {
          console.error('Error inserting ingredients:', error);
          res.status(500).json({ error: 'Failed to insert ingredients to the corresponding recipe' });
        });
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

