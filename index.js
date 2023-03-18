const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express()
const pinRoute = require("./routes/mapPins")
const postRoute = require("./routes/userPosts")
const groupRoute = require("./routes/createGroup")
const userRoute = require("./routes/userProfile")
const cors = require('cors');
const http = require('http').Server(app);

const Messages = require('./models/Messages');
const Group = require("./models/Groups");

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

dotenv.config()

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

let users = [];

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    //sends the message to all the users on the server
    socket.on('message', async (data) => {
        // socketIO.emit('messageResponse', data);
        //Adds the new user to the list of users
        users.push(data.name);
       
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);

        const saveMsg = new Messages({
            name: data.name,
            text: data.text,
            group: data.groupId
        });
        await saveMsg.save().then(async() => {
            await Group.findByIdAndUpdate(data.groupId, { messageUpdate: new Date() })
            console.log("🐱‍🏍:Message saved in db");
        }).catch((err) => {
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
});


app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});

app.use("/api/pins", pinRoute)

app.use("/api/userPosts", postRoute)

app.use("/api/createGroup", groupRoute)

app.use("/api/profile", userRoute)

http.listen(3000, () => {
    console.log("Server has started at 3000");
})