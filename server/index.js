// server/index.js

const express = require("express");
//const db = require('./config/db');
//const db = require('./config/db');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json())

const mysql = require('mysql');
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quotes-app-entretien"
})

db.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connecté à la base de données MySQL du xampp!");
  }
});

// Route to create all tables
app.post('/api/createTables', (req, res) => {

  db.query("DROP TABLE IF EXISTS quotes", (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });

  db.query("CREATE TABLE quotes (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, quote VARCHAR(255))", (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });

});

// Route for creating the post
app.post('/api/testCreate', (req, res) => {
  const quote = req.body.texte;

  db.query("INSERT INTO quotes (quote) VALUES (?)", [quote.texte], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });
})

// Route to get all posts
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM quotes", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});

// Route to get one post
app.get("/api/getOneRandom", (req, res) => {
  db.query("SELECT quote FROM quotes ORDER BY RAND() LIMIT 1", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});

app.get("/api/getApiKaa", (req, res) => {
  app.get("http://kaamelott.chaudie.re/api/random")
    .then((response) => {
      res.send(response)
    })
});



/*
// Route to get one post
app.get("/api/getFromId/:id", (req, res) => {

  const id = req.params.id;
  db.query("SELECT * FROM posts WHERE id = ?", id,
    (err, result) => {
      if (err) {
        console.log(err)
      }
      res.send(result)
    });
});

// Route for creating the post
app.post('/api/create', (req, res) => {

  const username = req.body.userName;
  const title = req.body.title;
  const text = req.body.text;

  db.query("INSERT INTO quotes (title, post_text, user_name) VALUES (?,?,?)", [title, text, username], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });
})



// Route to like a post
app.post('/api/like/:id', (req, res) => {

  const id = req.params.id;
  db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });
});

*/


/*
// Route to create all tables
app.post('/api/dropTable/:table', (req, res) => {

  const table = req.params.table;
  db.query("DROP TABLE IF EXISTS ?", table, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });
});

// Route to delete a post

app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err)
    }
  })
})


app.get("/api", (req, res) => {
  res.json({
    message: "Hello from server!"
  });
});

*/

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});