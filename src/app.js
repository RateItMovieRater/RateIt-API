import 'dotenv/config';
import cors from 'cors';
import express from 'express';
const app = express();
import routes from './routes/routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';

// Middlewere
app.use(cors());
app.use(cookieParser("secret"));
app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      cookie: false
    })
);
app.use(express.json());
app.use('/api', routes);

// API health check function
app.get('/api/health', (req, res) => {
    console.log('Request recieved sucessfully');
    res.send('The app is running');
})

export default app;
