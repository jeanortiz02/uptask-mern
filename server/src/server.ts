import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db';
import projectRouter from './routes/projectRoutes';
import cors from 'cors';
import { corsConfig } from './config/cors';

dotenv.config()

// conection for DB
connectDB()

const app = express();
app.use( cors(corsConfig))

// Leer body
app.use(express.json());
// Routes
app.use('/api/projects', projectRouter);


export default app;