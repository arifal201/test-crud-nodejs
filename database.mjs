import mysqlPromise from "mysql2/promise.js";
import Dotenv from 'dotenv';
import Sequalize from "sequelize";

Dotenv.config();

export async function checkDatabaseConnection(){
  return new Promise(() => {
    // connection for create database if not exists
    const connection = mysqlPromise.createConnection({
      host: process.env.DB_HOSTNAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    });
    
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
    
    console.log('database sudah ada atau berhasil dibuat');
    
    // connection database sequelize
    const dbconnection = new Sequalize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
      host: process.env.DB_HOSTNAME,
      dialect: 'mysql'
    });
    
    // check connection database
    dbconnection.authenticate().then(() =>{
      console.log(`Connection database Successfuly`);
    }).catch((error) => {
      console.error(`Unable to connect database `,error);
    });
  })
}