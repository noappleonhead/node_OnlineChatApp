const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    // Admin welcome message
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));
    //Admin text New user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined!'));

    //listen on the createmessage emit
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        //send message to everyone
        io.emit('newMessage',generateMessage(message.from,message.text)); 
        callback('this is from server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server')
    });
})

server.listen(port, () => {
    console.log(`server is up on port ${port}`)
})