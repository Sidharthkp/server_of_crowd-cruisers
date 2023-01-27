const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express()
const pinRoute = require("./routes/mapPins")
const cors = require('cors');
const http = require('http').Server(app);

const mongoSaveMessage = require('./models/Messages');

const CHAT_BOT = 'ChatBot';

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

let users = [];
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    //sends the message to all the users on the server
    socket.on('message', async (data) => {
        socketIO.emit('messageResponse', data);
        //Adds the new user to the list of users
        users.push(data.name);
        // console.log(users);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
        const saveMsg = new mongoSaveMessage({ 
            name: data.name,
            text: data.text
         });
         await saveMsg.save().then(()=>{
            console.log("Message saved in db");
         }).catch((err)=>{
            console.log(err);
         })
    });

    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

    socket.on('disconnect', () => {
        console.log('😪: A user disconnected');
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);
        // console.log(users);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
        socket.disconnect();
    });


    // Add a user to a room
    socket.on('join_room', (data) => {
        const { username, room } = data; // Data sent from client when join_room event emitted
        socket.join(room); // Join the user to a socket room

        let __createdtime__ = Date.now(); // Current timestamp

        // Send message to all users currently in the room, apart from the user that just joined
        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__,
        });

        // Save the new user to the room
        chatRoom = room;
        allUsers.push({ id: socket.id, username, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);

    });

});

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

dotenv.config()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});

app.use("/api/pins", pinRoute)


http.listen(3000, () => {
    console.log("Server has started at 3000");
})