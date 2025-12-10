const express = require("express");
const {adminAuth} = require("./middlewares/auth");

const app = express();

// app.use((err,req,res,next)=>{
//    const token = "xyzhjhjhjh";
//    const isAuthenticated = token ==="xyz"
//    if(isAuthenticated) {
//      res.send("all data sent")

//    }
// })

app.get("/user",(req,res)=>{
   res.send("get user");
});

app.get("/admin",adminAuth);

app.get("/admin/getAllData",adminAuth,(req,res)=>{
   res.send("get all admnin data..")
});

// app.use("/",(err,req,res,next)=>{
//      if(err) {
//        res.status(500).send("Something went wrong")   
//      }
// })

app.listen(7777);


