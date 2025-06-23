const mongoose = require('mongoose');

//schema design
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
    },
    email:{
        type:String,
        required:[true, 'email is required and should be unique'],
        unique:true,
    },
    password:{
        type:String,
        password:[true,'Password is required']
    }
},{timestamps:true});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;