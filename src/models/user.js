const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 30
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value){
               if(!(validator.isEmail(value))){
                 throw new Error("Email is not valid."+ value);
               }
            }
        },
        password: {
            type: String,
            required: true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                  throw new Error("Enter strong password. "+ value);
                }
            }
        },
        age: {
            type: Number,
            min: [18,"Minimun age should be 18"]
        },
        gender: {
            type: String,
            lowercase: true,
            validate(value){
                if(!(["male","female","others"].includes(value))){
                    throw new Error("Gender data is not valid");
                }
            }
        },
        photoUrl: {
           type: String ,
           default: "https://www.freepik.com/free-vector/illustration-businessman_2606517.htm#fromView=keyword&page=1&position=30&uuid=04c2a359-a20e-4160-a3b4-da2f30b200ea&query=Default+profile",
           validate(value){
               if(! validator.isURL(value)){
                throw new Error("Enter a valid URL. "+ value);
               }
           }
        
        },
        about: {
            type: String,
            default: "This is my default about info"
        },
        skills: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);


