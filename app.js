import 'dotenv/config';
import cors from 'cors';
import express from 'express';
const app = express();

// Environment variables
const PORT = process.env.PORT;

// Middlewere
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    console.log('Request recieved sucessfully');
    res.send('Hello, world');
})

app.listen(PORT, () => {
    console.log('The app is running on port ' + PORT);
});
