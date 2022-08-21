const mysql = require("mysql");

// connect mysql
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  // set DB name you wanna connect
  database: process.env.DATABASE,
});


// connect with db
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL Connected...");
  }
});

module.exports = db;
