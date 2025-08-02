const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes');
const userRoutes =require('./routes/userRoutes');

// database
connectDB();

const app = express();
// middleware
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})