const mysql = require('mysql');

// create infomation to connect to your database
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '12345',
    database: process.env.DB_NAME || 'demo'
});

// connect to database by using connect() method
db.connect((error) => {
    if (error) throw error;
    console.log('Connected Database Successfull');
});

module.exports = db;