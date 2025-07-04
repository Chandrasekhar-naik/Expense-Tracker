const mongoose  = require('mongoose');
const colors = require('colors');

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected successfully ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`${error}`.bgRed);
    }
}

module.exports = connectDB;