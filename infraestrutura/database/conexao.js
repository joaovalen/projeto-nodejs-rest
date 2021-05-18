const mysql = require('mysql')
//includes the mysql module downloaded using npm install mysql

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'
})
// createConnection() is a mysql function that receives host,port,user,password,database

module.exports = conexao
// exporting our const to be used on other files 