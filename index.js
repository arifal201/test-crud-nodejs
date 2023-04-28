import Express from "express";
import Sequalize from "sequelize";
import Dotenv from 'dotenv';
import Mysql from "mysql2";

// initial
Dotenv.config();
const app = Express();

// create database if not exist
function checkDatabaseExists(){
  const conn = Mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  });
  conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);  
}

// connection database
const dbconnection = new Sequalize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
  host: process.env.DB_HOSTNAME,
  dialect: 'mysql'
});

// check connection database
dbconnection.authenticate().then(() =>{
  console.log(`Connection database Successfuly`);
}).catch((error) => {
  checkDatabaseExists();
  console.error(`Unable to connect database `,error);
});


// add listen port 3000
app.listen(3000, () => {
  console.log("app is running on port 3000");
  checkDatabaseExists();
});

// routing
app.get('/', (req,res) =>{
  res.send(`${process.env.DB_HOSTNAME}`);
});