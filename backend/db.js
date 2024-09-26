const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'typinggame'
})

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Successfully connected to database');
})

module.exports = connection;