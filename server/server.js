const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    //listen on the createmessage emit
    socket.on('createMessage',(message)=>{
        console.log('createMessage',message)
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        })//send message to everyone
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from server')
    })
})

server.listen(port, () => {
    console.log(`server is up on port ${port}`)
})