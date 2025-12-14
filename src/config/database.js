const mongoose = require("mongoose");


const connectdb = async ()=>{
    await mongoose.connect("mongodb+srv://bhoyarswati53:Bronzie%402014@hellonode.rl5hzgc.mongodb.net/");
}

module.exports = connectdb;