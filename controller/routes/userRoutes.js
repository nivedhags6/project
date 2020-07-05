const express=require('express');
const router=express.Router();
const path=require('path');
const connect=require('../../model/database');
var data1=[];
router.get('/',(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'..','..','views','proj_index.html'));
    res.render("proj_index");
});

router.get('/admin',(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'..','..','views','proj_index_admin.html'));
    res.render("proj_index_admin");
});

router.get('/login_admin',(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'..','..','views','proj_login_admin.html'));
    res.render("proj_login_admin",{er:""});
});

router.get('/login',(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'..','..','views','proj_login.html'));
    res.render("proj_login",{er:""});
});

router.use('/signup_admin',(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'..','..','views','proj_signup_admin.html'));
    res.render("proj_signup_admin",{er:"" });
});

router.use('/signup',(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'..','..','views','proj_signup.html'));
    res.render("proj_signup",{duplicate:""});
});

router.post('/calculate',(req,res,next)=>{
    let stud={};
    let name=req.body.Uname;
    let rollno=req.body.rollno;
    let date=req.body.examdate;
    let m1= req.body.mark1;
    let m2= req.body.mark2;
    let m3= req.body.mark3;
    connect.query("insert into Student_Scoresheet values(?,?,?,?,?,?)",  [name,rollno,date,m1,m2,m3],(err,results)=>{
        if(err) throw err;
        if(results){
            // res.sendFile(path.join(__dirname,'..','..','views','proj_login_admin.html'));
            res.send("<h1>Marks entered successfully</h1>")
            console.log("insert Query successfull");
        }
    })
})

router.post('/execute_register',(req,res,next)=>{
    let name=req.body.Uname;
    let roll=req.body.rollno;
    let email=req.body.Email;
    let pwd=req.body.password;
    let gender=req.body.gender;
    connect.query("insert into Student_Details values(?,?,?,?,?)",  [name,roll,email,pwd,gender],(err,results)=>{
        if(err) 
        {if(err.code=='ER_DUP_ENTRY') {
            console.log("Cannot insert");
            res.render("proj_signup",{duplicate:"Duplicate entry found"});
        }}
        if(results){
            // res.sendFile(path.join(__dirname,'..','..','views','proj_login.html'));
            console.log("insert Query successfull");
            res.render("proj_login",{er:""});
        }
    })
});

router.post('/execute_register_admin',(req,res,next)=>{
    let name=req.body.Uname;
    let email=req.body.Email;
    let pwd=req.body.password;
    let gender=req.body.gender;
    connect.query("insert into Faculty_Details values(?,?,?,?)",  [name,email,pwd,gender],(err,results)=>{
        if(err) throw err
        if(results){
            // res.sendFile(path.join(__dirname,'..','..','views','proj_login.html'));
            console.log("insert Query successfull");
            res.render("proj_login_admin",{er:""});
        }
    })
});

router.post('/execute_login',(req,res,next)=>{
    let email=req.body.Email;
    let pwd=req.body.password;
    connect.query("select * from Student_Details where Student_Email_ID =(?)",[email],(err,results)=>{
        if(err) throw err;
        if(results.length>0)
        {
            results.forEach((row) => {
                var roll=row.Student_Rollno;
                if(row.Student_Password === pwd){
                    connect.query('select Student_Scoresheet.*, Student_Details.Student_Email_ID from Student_Scoresheet join Student_Details on Student_Scoresheet.Student_Rollno= Student_Details.Student_Rollno where Student_Scoresheet.Student_Rollno=(?)',[roll], (err, data, fields) =>{
                    if (err) throw err;
                    res.render('user-list', { title: 'User List', userData: data,avg:'Average score'});
                    });
                }
        else{
        res.render("proj_login",{er:"Email ID and Password doesn't match"})
        }
        });
    }
    else {
        res.render("proj_login",{er:"Email ID doesnot exists"});
        console.log("Email ID doesnot exists");    
    }
  })
});

router.post('/execute_login_admin',(req,res,next)=>{
    let email=req.body.Email;
    let pwd=req.body.password;
    connect.query("select Faculty_Password from Faculty_Details where Faculty_Email_ID =(?)",[email],(err,results)=>{
        if(err) throw err;
        if(results.length>0)
        {
            results.forEach( (row) => 
            {
                if(row.Faculty_Password  === pwd)
                {
                    // res.sendFile(path.join(__dirname,'..','..','views','proj_stud_entry.html'));
                    console.log("password match");
                    res.render("proj_stud_entry");
                }
                else
                {
                    res.render("proj_login_admin",{er:"Email ID and Password doesn't match"});
                    console.log("Email ID and Password doesn't match");
                }
            });
        }
        else{
            res.render("proj_login_admin",{er:"Email ID doesnot exists"});
            console.log("Email ID doesnot exists");    
        }
  })
});

module.exports=router;