const mongoose  = require('mongoose');
const colors = require('colors');

const connectDB = async () =>{
    try {
        const mongoUri = process.env.MONGODB_URI?.trim();
        if (!mongoUri) {
            throw new Error("MONGODB_URI is missing in the root .env file");
        }

        await mongoose.connect(mongoUri);
        console.log(`MongoDB connected successfully ${mongoose.connection.host}`.bgCyan.white);
        return mongoose.connection;
    } catch (error) {
        console.log(`${error}`.bgRed);
        throw error;
    }
}

module.exports = connectDB;
