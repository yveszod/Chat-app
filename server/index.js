const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');


app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods:['POST', 'GET'],
    }
});

io.on('connection', (socket) => {
    console.log(`User ${socket.id} established connection`);

    // Join Room
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User ${socket.id} joined the room ${data}`)
    })

    // Message Handling
    socket.on('send_message', (data) => {
        socket.to(data.room).emit('recieve_message', data);
    })
    
    // Disconnect
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

server.listen(3001, () => {
    console.log('Server is running');
});