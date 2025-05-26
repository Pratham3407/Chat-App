import express from "express";
import authRoutes from "./routes/auth.route.js"; // on signup, login and logout auth.route.js file is  called
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cors from "cors"; // cors is imported to enable cross-origin resource sharing
import path from "path";
import cookieParser from "cookie-parser"; // cookie-parser is imported to parse cookies
import {app, server} from "./lib/socket.js"; // app is imported from socket.js file
import {connectDB} from "./lib/db.js"; // connectDB function is imported from db.js file
dotenv.config() 
// dotenv is used to load environment variables from a .env file


const PORT = process.env.PORT
const __dirname = path.resolve(); // __dirname is used to get the current directory name

app.use(cors({
    origin: "http://localhost:5173", // frontend url
    credentials: true, // allow credentials
})); // cors is used to enable cross-origin resource sharing
app.use(express.json());
app.use(cookieParser()); // cookie-parser is used to parse cookies
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist"))); // serve static files from the frontend build directory
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html")); // send index.html for all other routes
    });
} 

server.listen(5001, () =>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});