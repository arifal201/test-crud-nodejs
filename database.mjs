import Mysql from "mysql2";
import Dotenv from 'dotenv';
import Sequalize from "sequelize";

Dotenv.config();

export async function checkDatabaseConnection(){
  return new Promise((resolve,reject) => {
    // connection for create database if not exists
    const connection = Mysql.createConnection({
      host: process.env.DB_HOSTNAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    });
    connection.connect();
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
    connection.end();
    console.log('database sudah ada atau berhasil dibuat');
    
    // connection database sequelize
    const dbconnection = new Sequalize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
      host: process.env.DB_HOSTNAME,
      dialect: 'mysql'
    });
    
    // check connection database
    dbconnection.authenticate().then(() =>{
      console.log(`Connection with sequelize database Successfuly`);
    }).catch((error) => {
      console.error(`Unable to connect database `,error);
    });
    
    resolve('success');
  })
}