import dotenv from 'dotenv';
import express, { json } from 'express';
import connectDB from './config/dbConnect.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js'
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import cors from 'cors';

dotenv.config();

// database
connectDB();

const app = express();
app.use(express.json()); 

// Better: add urlencoded support in case you need form-data parsing without files
app.use(express.urlencoded({ extended: true }));

// CORS – if you’ll deploy, better open up env-based config:
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));


// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/course', courseRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/enrollments", enrollmentRoutes);

// server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})