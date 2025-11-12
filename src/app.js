const express = require("express");

const app = express();

app.use("/hello",
    [(req,res,next)=>{
        next();
        console.log("Hello 1");
        res.send("routed to /hello 1");  //err
    },
    (req,res,next)=>{
         next();
         console.log("Hello 2");
         res.send("routed to /hello 2"); //err
         
    },
    (req,res)=>{
         res.send("routed to /hello 3");
         console.log("Hello 3");
    },
    (req,res)=>{
         res.send("routed to /hello 3");
    },]
);

app.listen(7777);


