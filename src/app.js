const express = require("express");

const app = express();

app.use("/hello",(req,res)=>{
    res.send("routed to /hello");
});

app.use('/test',(req,res)=>{
  res.send("routed to test page");
});

app.use("/",(req,res)=>{
    res.send("Hello from the homepage!");
});

app.listen(7777,()=>{
    console.log("server is listening on port 7777");
})