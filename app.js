const express= require('express');
const bodyParser=require('body-parser');
const app=express();
const path=require('path');

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('public'));
const myRoutes=require('./controller/routes/userRoutes');

app.use(myRoutes);
app.set("views","./views");
app.set("view engine","ejs");
app.listen(3030,()=>{
    console.log("Server is running at port 3030");
});