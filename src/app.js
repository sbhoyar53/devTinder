const express = require("express");
const connectdb = require("./config/database");
const {adminAuth} = require("./middlewares/auth");
const  User = require("./models/user");
const {validateSignupData} = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res)=>{
     try {
          //validate request body
          validateSignupData(req);

          //Encrypt the password
          const { firstName,lastName,emailId,password } = req.body;
          const saltRounds = 10;
          const passwordHash = await bcrypt.hash(password,saltRounds);

          //creating new instance of User model
          const user = new User({
               firstName,
               lastName,
               emailId,
               password: passwordHash
          });
          await user.save();
          res.send("User saved successfully!");

     } catch(error) {
          res.status(400).send("ERROR : "+ error.message);
     }
});


app.post("/login", async (req, res)=>{
     try {
          const { emailId, password } = req.body;

          const user = await User.findOne({emailId: emailId});

          if(user.length === 0){
               throw new Error("Inavalid Credentials..");
          }
          
          isPasswordValid = await bcrypt.compare(password, user.password);

          if(isPasswordValid) {
               var token =  await jwt.sign({_id : user._id}, "DevTinder@App123");
               res.cookie("token", token);
               res.send("loginess successful!");
          }else {
               throw new Error("Inavalid Credentials..");
          }

     }catch(err){
          res.status(400).send("ERROR : "+ err.message);
     }
})
 
//get user by email id
app.get("/user", async (req, res) => {
     const userEmail = req.query.emailId;
     try {
          console.log("userEmail=", userEmail);
          const user = await User.find({ emailId: userEmail });
          if (user.length === 0) {
               res.status(404).send("User not found");
          } else {
               res.send(user);
          }
     } catch (err) {
          res.status(404).send("not found" + err.message)
     }
});

app.get("/profile", async (req,res)=>{
     try{
      const cookies = req.cookies;

      const { token } = cookies;

      if(!token) {
          throw new Error("Inavalid token.");
      }
      //validate token
      decodedMessage = await jwt.verify(token,"DevTinder@App123");

      const { _id } = decodedMessage;
     
      const user = await User.findOne({_id});

      if(!user){
        throw new Error("User does not exist.");
      }
      res.send("Logged in successfuly.  "+ user);
    
     } catch(err) {
          res.status(400).send("ERROR : "+ err.message);
     }
});

//Feed API -Get/feed - get all the users from database
app.get("/feed", async (req, res) => {
     try {
          const feeds = await User.find({});
          if (feeds.length === 0) {
               res.status(404).send("There are no feeds");
          } else {
               res.send(feeds)
          }
     } catch (error) {
          res.status(404).send("Error finding feeds" + error.message)
     }
});


//Delete a user fromn database
app.delete("/delete", async (req,res) => {
    const userId = req.query._id;
    console.log("id=="+ userId);
   try {
    await User.deleteOne({_id :userId});
    res.send("deleted user");
     
   }catch(err) {
     res.status(404).send("Error in deleting"+ err.message);
   }
});

//Update data of the user (findByIdAndUpdate)
app.patch("/update", async (req, res) => {
     const id = req.query._id;
     const data = req.body;

     console.log("data=", data);
     console.log("id=", id);

     try {
          //validate allow only fields that can be updated
          const ALLOWED_UPDATES = new Set (["firstName", "lastName","password","age", "gender","photoUrl","about","skills"]);

          const iSUpadteAllowed = Object.keys(data).every((key)=>{
               return ALLOWED_UPDATES.has(key);
          });

          if(!iSUpadteAllowed){
             throw new Error("User email can not be updated");
          }

          const result = await User.findByIdAndUpdate(id, data, {runValidators: true});  //upadte first doc

          if (!result) {
               res.status(404).send("User not found..");
          } else {
               res.json({
                    message: "User updated successfully!",
                    result
               })
          }

     } catch (error) {
          res.status(500).send("update failed.." + error.message);
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


