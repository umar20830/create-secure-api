const mongoose = require("mongoose");


const dbConnection = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }catch(err){
        console.error("Error connecting to MongoDB");
        process.exit(1);
    }
}

module.exports = dbConnection;

