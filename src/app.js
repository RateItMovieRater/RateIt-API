import 'dotenv/config';
import cors from 'cors';
import express from 'express';
const app = express();
import userRouter from './routes/userRoutes.js';

// Middlewere
app.use(cors());
app.use(express.json());
app.use('/api/user/', userRouter);

// API health check function
app.get('/api/health', (req, res) => {
    console.log('Request recieved sucessfully');
    res.send('The app is running');
})

export default app;
