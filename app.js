const express= require('express');
const bodyParser=require('body-parser');
const app=express();
const path=require('path');

app.use(bodyParser.urlencoded({extended:false}));

app.set("port",process.env.PORT || 8080);
app.use(express.static('public'));
const myRoutes=require('./controller/routes/userRoutes');

app.use(myRoutes);
app.set("views","./views");
app.set("view engine","ejs");
app.listen(app.get("port"),()=>{
    console.log("Server is running at port "+app.get("port"));
});