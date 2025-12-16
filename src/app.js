const express = require("express");
const connectdb = require("./config/database");
const {adminAuth} = require("./middlewares/auth");
const  User = require("./models/user");
const { model } = require("mongoose");


const app = express();

app.use(express.json());

app.post("/signup", async (req, res)=>{
     const user = new User(req.body);
     try {
          await user.save();
          res.send("User saved successfully!");

     } catch(error) {
          res.status(400).send("error occured while saving request"+ error.message);
     }
});

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
     console.log("id=", id)

     try {
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


