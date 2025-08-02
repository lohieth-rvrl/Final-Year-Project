import dotenv from 'dotenv';
import express, { json } from 'express';
import connectDB from './config/dbConnect.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

// database
connectDB();

const app = express();
// middleware
app.use(json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})