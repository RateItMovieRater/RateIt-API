import app from "./src/app.js";

// Environment Variables
const PORT = process.env.PORT;

// Server
app.listen(PORT, () => {
    console.log('The app is running on port ' + PORT);
})
