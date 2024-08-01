import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db';
import projectRouter from './routes/projectRoutes';
import authRoutes from './routes/authRoutes'
import cors from 'cors';
import { corsConfig } from './config/cors';
import morgan from 'morgan';

dotenv.config()

// conection for DB
connectDB()

const app = express();

// Cors 
app.use( cors(corsConfig))

// logging
app.use(morgan('dev'))

// Leer datos de formularios
app.use(express.json());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRouter);


export default app;