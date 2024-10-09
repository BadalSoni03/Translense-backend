const mongoose = require("mongoose");
require('dotenv');

const connectToDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        console.log("MongoDB URI : " + process.env.MONGO_URI);
        await mongoose
            .connect(MONGO_URI)
            .then(() => console.log("Connection with db established"));
        
        return true;
    } catch (error) {
        console.log(error.message);
        console.log("Something went wrong while connecting to the mongoose database");
    }
    return false;
}
module.exports = connectToDB;