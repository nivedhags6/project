const mysql=require('mysql2');
const connect= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'studentdb',
    port:'3307'
  });



  module.exports=connect;