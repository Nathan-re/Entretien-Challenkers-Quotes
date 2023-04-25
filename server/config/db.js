/*const mysql = require('mysql');
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database:"678q4_entretien" 
})
*/


const mysql = require('mysql');
const db = mysql.createConnection({
host: "678q4.myd.infomaniak.com",
user: "678q4_entretien",
password: "Mgd7QM353z6wLb",
database:"678q4_entretien" 
})


module.exports = db;