//const db = require('./config/db');

const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json())

const mysql = require('mysql');
//Configuration base de donnee
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quotes-app-entretien"
})

//Connexion base de donnee
db.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connecté à la base de données MySQL du xampp!");
  }
});

// Route pour créer les tables
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

// Route pour creer une citation en fonction du texte passe en parametre
app.post('/api/testCreate', (req, res) => {
  const quote = req.body.texte;

  db.query("INSERT INTO quotes (quote) VALUES (?)", [quote.texte], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });
})

// Route pour recuperer toutes les quotes
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM quotes", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});

// Route pour recuperer un post aleatoire
app.get("/api/getOneRandom", (req, res) => {
  db.query("SELECT quote FROM quotes ORDER BY RAND() LIMIT 1", (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  });
});

// Route pour recuperer une citation dans l'api kaamelott
app.get("/api/getApiKaa", (req, res) => {
  app.get("http://kaamelott.chaudie.re/api/random")
    .then((response) => {
      res.send(response)
    })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});