import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db';
import projectRouter from './routes/projectRoutes';

dotenv.config()

// conection for DB
connectDB()

const app = express();


// Routes
app.use('/api/projects', projectRouter);


export default app;