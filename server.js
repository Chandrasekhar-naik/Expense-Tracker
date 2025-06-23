const express = require('express');
const cors = require('cors'); 
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db.js');
const app = express();
//config dotenv file
dotenv.config();


//databse call
connectDB();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.get('/',(req,res)=>{
    res.send("<h1>Server is up</h1>")
})

app.use('/api/v1/users',require('./routes/userRoute.js'));

app.use('/api/v1/transactions',require('./routes/transactionRoute.js'));

//port
const PORT = 8080 || process.env.PORT;

//listen 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgBlue.white);
});
