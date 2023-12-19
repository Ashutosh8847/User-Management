const mysql = require('mysql2/promise');
// Create a connection to the MySQL database

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:"Ashu@123",
    database: 'employee_databse',
    
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });


module.exports= pool;


