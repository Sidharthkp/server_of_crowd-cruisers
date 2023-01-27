const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express()
const pinRoute = require("./routes/mapPins")
const cors = require('cors');
const http = require('http').Server(app);

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    //sends the message to all the users on the server
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
    });

    socket.on('disconnect', () => {
        console.log('😪: A user disconnected');
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