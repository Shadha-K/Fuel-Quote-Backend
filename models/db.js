const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 10 
});

 pool.getConnection((err, connection) => {
     if (err) {
         console.error('Database connection failed:', err.stack);
         return;
     }
     console.log('Connected to database as ID', connection.threadId);
     connection.release();
 });

module.exports = pool;
