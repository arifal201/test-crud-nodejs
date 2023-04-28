import Express from "express";
import Dotenv from 'dotenv';
import {checkDatabaseConnection} from "./database.mjs";

// initial
Dotenv.config();
const app = Express();

// add listen port 3000
app.listen(3000, async () => {
  console.log("app is running on port 3000");
  const db = await checkDatabaseConnection();
  console.log(db);
});

// routing
app.get('/', (req,res) =>{
  res.send(`${process.env.DB_HOSTNAME}`);
});