// npm packages
const express=require("express");
const bodyParser=require("body-parser");
const nodemailer=require('nodemailer');
require("dotenv").config();

// nodemailer authentication
const  transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:process.env.EMAIL,
    pass:process.env.PASS
  }
});

//express
const app=express();

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

//routing
app.get("/",(req,res)=>{
    res.render("home");
});


app.post("/book",(req,res)=>{
    console.log(req.body);
    const data=req.body;
    var mailOptions={
        from:process.env.EMAIL,
        to:data.parentEmail,
        subject:'NotchUp Trial Class Booked successfully',
        html:`Dear ${data.parentName} <br> ${data.childName}'s class at <b> ${data.trialDate} ${data.trialTime} </b> has been successfully booked.`
      };
      
      transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
            res.json({success:false});
        }else{
            res.json({success:true});
        }
    });
});

//port number
const port=process.env.PORT||3000;

//server listening
app.listen(port,()=>{
    console.log(`app is running on ${port}`);
})