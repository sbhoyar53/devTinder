const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {

  console.log("req",req.cookies);
  try {
   const  { token } = req.cookies;
   if(!token){
    throw new Error("Invalid token.");
   }
   const decodedData = await jwt.verify(token,"DevTinder@App123");
   const user =  await User.findById(decodedData._id);
   
   if(!user) {
     throw new Error("user not found.");
   }
    req.user = user;  //set user so that it will be available in api 
    next();
  
  } catch (error) {
    res.status(400).send("ERROR : " + error);
  }

}

module.exports = {userAuth};