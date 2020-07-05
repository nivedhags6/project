const mysql=require('mysql2');
const connect= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'studentdb'
  });



  module.exports=connect;