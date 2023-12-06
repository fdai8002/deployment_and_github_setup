const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql2");

/*
    This is just for reading environment files like `.env` file
    We can keep some secret data like database password in that `.env` file
*/
dotenv.config();

/*
    This creates a new PostgreSQL client instance. 
    This instance can be used to query our database 
*/
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.log("DB Connection Issue: ", err)
  }
  console.log("DB Connected");
});

/*
    `express()` created a new express app instance
    This application acts as the top-level function of the Express framework and enables you to set up various configurations, 
    routes, and middleware to handle HTTP requests, define routes, serve static files, and much more.
*/
const app = express();

app.use(express.json());
app.use(cors());

// Route Handlers

/*
    When a GET request is made to '/' route, this will read the users data from database and send it to frontend 
*/
app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(208).json(results);
  });
});

/*
    When a POST request is made to '/' route, this will read the data send in request body
    and create a new user in database 
*/
app.post("/", (req, res) => {
  const newData = req.body;

  const sql = `INSERT INTO users (name, phone_number) VALUES ('${newData.name}', '${newData.phone_number}')`;
  connection.execute(
    "INSERT INTO users (name, phone_number) VALUES (?, ?)",
    [newData.name, newData.phone_number],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added`);
    }
  );
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

/*
    Author: Samman Adhikari
    Created: 04.11.2023
*/
