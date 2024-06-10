import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express(); // Create an instance of an Express app
const server = http.createServer(app); // Create an HTTP server from the Express app
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
}); // Create a Socket.io server with the HTTP server

export const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId]; // Get the socket ID of the recipient
}

const userSocketMap = {}; // userId: socketId // Map to store the socket ID of each user

// Listen for incoming connections
io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    const userId = socket.handshake.query.userId; // Get the user ID from the query parameter in the handshake event 

    if (userId != "undefined") userSocketMap[userId] = socket.id;  // Store the socket ID of the user in the map
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit the list of online users to all connected clients

    socket.on("disconnect", () => {
        console.log("user disconnected");
        delete userSocketMap[userId]; // Remove the socket ID of the user from the map
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }); // Disconnect the user when the connection is closed
});

export { io, server, app };