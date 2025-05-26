import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

export function getReceiverSocketId(userId){
    return userSocketMap[userId]; // returns the socketId of the user
};
// used to store online users
const userSocketMap = {}; //{userid: socketid}


io.on("connection", (socket) => {
    console.log("A user Connected", socket.id);

    const userId = socket.handshake.query.userId; // assuming userId is sent as a query parameter
    if (userId) userSocketMap[userId] = socket.id; // store the userId and socketId in the map
    // io.emit is used to emit an event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // emit the online users to all connected clients
    
    socket.on("disconnect", () => {
        console.log("A user Disconnected", socket.id);
        delete userSocketMap[userId]; // remove the userId from the map on disconnect    
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // emit the updated online users to all connected clients
    });
});

export { io, app, server }; 