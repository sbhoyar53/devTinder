const express = require("express");
const connectdb = require("./config/database");
const {adminAuth} = require("./middlewares/auth");
const  User = require("./models/user")


const app = express();


app.post("/signup", async (req, res)=>{
     const user = new User({
          firstName: "Bitty",
          lastName: "Bhoyar",
          emailId:"bitty@123gmail.com",
          password: "bitty@123"
     });
     try {
          await user.save();
          res.send("User saved successfully!");

     } catch(error) {
          res.status(400).send("error occured while saving request"+ error.message);
     }
    
});

connectdb()
.then(()=>{
    console.log("database connection established successfully");
})
.catch((error)=>{
    console.error("database can not connected!!");
})

app.listen(7777);


